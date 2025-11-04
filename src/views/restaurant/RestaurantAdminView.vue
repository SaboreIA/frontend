<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-6xl mx-auto space-y-10">
      <header
        class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
      >
        <div>
          <p
            class="text-sm uppercase tracking-wide text-amber-600 font-semibold"
          >
            Painel BI - Visão rápida
          </p>
          <h1 class="text-4xl font-extrabold text-gray-900">
            {{ analyticsHeader.title }}
          </h1>
          <p class="text-gray-500 mt-2">
            Última atualização: {{ analyticsHeader.lastUpdated }} · Intervalo:
            {{ analyticsHeader.period }}
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <router-link
            :to="{ name: 'restaurante-detalhe', params: { id: restaurantId } }"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition"
          >
            <ArrowUturnLeftIcon class="w-5 h-5" />
            <span>Voltar para o restaurante</span>
          </router-link>
          <button
          @click="savePDF"
            class="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-amber-600 text-white text-sm font-semibold shadow hover:bg-amber-700 transition"
          >
            <ArrowDownTrayIcon class="w-5 h-5" />
            <span>Exportar relatório</span>
          </button>
        </div>
      </header>

      <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article
          v-for="card in summaryCards"
          :key="card.id"
          class="bg-white rounded-xl shadow p-6 border-l-4"
          :class="card.accent"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center w-12 h-12 rounded-full bg-amber-50 text-amber-600"
              >
                <component :is="getSummaryIcon(card.icon)" class="w-6 h-6" />
              </div>
              <div>
                <h3
                  class="text-sm font-semibold text-gray-700 uppercase tracking-wide"
                >
                  {{ card.title }}
                </h3>
                <p class="text-xs text-gray-400 uppercase tracking-wider">
                  Último período
                </p>
              </div>
            </div>
            <div class="flex flex-col items-end">
              <span
                class="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
                :class="getTrendClass(card.delta)"
              >
                <component :is="getTrendIcon(card.delta)" class="w-4 h-4" />
                <span>{{ formatDelta(card.delta) }}</span>
              </span>
              <span class="mt-1 text-[11px] text-gray-400"
                >vs. mês anterior</span
              >
            </div>
          </div>
          <p class="mt-6 text-3xl font-bold text-gray-900">
            {{ card.value }}
          </p>
          <p class="mt-2 text-sm text-gray-500">
            {{ card.subtitle }}
          </p>
        </article>
      </section>

      <section class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div class="xl:col-span-2 bg-white rounded-xl shadow p-6">
          <header
            class="flex flex-wrap items-center justify-between gap-4 mb-6"
          >
            <div class="flex items-center gap-3">
              <ChatBubbleLeftRightIcon class="w-6 h-6 text-amber-600" />
              <div>
                <h2 class="text-xl font-bold text-gray-800">
                  Comentários por período
                </h2>
                <p class="text-sm text-gray-500">
                  Visualize o volume de avaliações recebidas nos últimos meses.
                </p>
              </div>
            </div>
            <button
              class="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition"
            >
              <ArrowTrendingUpIcon class="w-5 h-5" />
              <span>Detalhar períodos</span>
            </button>
          </header>
          <div class="h-80">
            <Line :data="commentsLineData" :options="lineChartOptions" />
          </div>
        </div>

        <div class="bg-white rounded-xl shadow p-6 space-y-6">
          <div>
            <h2 class="text-xl font-bold text-gray-800">
              Sentimento das avaliações
            </h2>
            <p class="text-sm text-gray-500">
              Distribuição das opiniões dos clientes neste período.
            </p>
          </div>
          <div class="h-60">
            <Doughnut :data="sentimentData" :options="doughnutOptions" />
          </div>
          <ul class="space-y-3">
            <li
              v-for="item in sentimentBreakdown"
              :key="item.label"
              class="flex justify-between text-sm"
            >
              <span class="font-medium text-gray-600 flex items-center gap-2">
                <span
                  class="inline-block w-2.5 h-2.5 rounded-full"
                  :style="{ backgroundColor: item.color }"
                ></span>
                {{ item.label }}
              </span>
              <span class="font-semibold text-gray-900">{{ item.value }}%</span>
            </li>
          </ul>
        </div>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="bg-white rounded-xl shadow p-6 lg:col-span-2">
          <header
            class="flex flex-wrap items-center justify-between gap-4 mb-6"
          >
            <div class="flex items-center gap-3">
              <ChartBarIcon class="w-6 h-6 text-amber-600" />
              <div>
                <h2 class="text-xl font-bold text-gray-800">
                  Origem dos acessos
                </h2>
                <p class="text-sm text-gray-500">
                  Entenda de onde os clientes estão chegando até você.
                </p>
              </div>
            </div>
            <span
              class="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-1 rounded-full"
            >
              Últimos 30 dias
            </span>
          </header>
          <div class="h-72">
            <Bar :data="sourceBarData" :options="barChartOptions" />
          </div>
        </div>

        <aside class="bg-white rounded-xl shadow p-6 space-y-5">
          <div>
            <h2 class="text-xl font-bold text-gray-800">Insights rápidos</h2>
            <p class="text-sm text-gray-500">
              Sugestões baseadas nos dados atuais.
            </p>
          </div>
          <ul class="space-y-4">
            <li
              v-for="insight in quickInsights"
              :key="insight.id"
              class="flex gap-3"
            >
              <span
                class="flex h-9 w-9 items-center justify-center rounded-full text-white shadow"
                :class="insight.accent"
              >
                <component :is="insightIcon" class="w-5 h-5" />
              </span>
              <div>
                <p class="font-semibold text-gray-800">{{ insight.title }}</p>
                <p class="text-sm text-gray-500">{{ insight.description }}</p>
              </div>
            </li>
          </ul>
        </aside>
      </section>

      <section class="bg-white rounded-xl shadow p-6">
        <header class="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div class="flex items-center gap-3">
            <UsersIcon class="w-6 h-6 text-amber-600" />
            <div>
              <h2 class="text-xl font-bold text-gray-800">
                Clientes que mais interagem
              </h2>
              <p class="text-sm text-gray-500">
                Ranking dos clientes com mais visitas e avaliações no período.
              </p>
            </div>
          </div>
          <button
            class="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition"
          >
            <ArrowTrendingUpIcon class="w-5 h-5" />
            <span>Ver lista completa</span>
          </button>
        </header>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cliente
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Último acesso
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Comentários
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Avaliação média
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="customer in topCustomers"
                :key="customer.id"
                class="hover:bg-gray-50"
              >
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <img
                      :src="customer.avatar"
                      :alt="customer.name"
                      class="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p class="text-sm font-semibold text-gray-800">
                        {{ customer.name }}
                      </p>
                      <p class="text-xs text-gray-500">
                        {{ customer.favoriteDish }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm text-gray-600">
                  {{ customer.lastVisit }}
                </td>
                <td class="px-4 py-3 text-sm font-semibold text-gray-800">
                  {{ customer.comments }}
                </td>
                <td class="px-4 py-3 text-sm font-semibold text-amber-600">
                  {{ customer.averageRating.toFixed(1) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { generateRestaurantReport } from "../../utils/jspdf.js";
import { Chart, registerables } from "chart.js";
import { Line, Bar, Doughnut } from "vue-chartjs";
import {
  ArrowDownTrayIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ArrowUturnLeftIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";

Chart.register(...registerables);

const summaryIconMap = {
  visits: ChartBarIcon,
  comments: ChatBubbleLeftRightIcon,
  favorites: UsersIcon,
};

function savePDF() {
  const report = generateRestaurantReport({
    restaurantName: activeAnalytics.value.name,
    analyticsHeader: analyticsHeader.value,
    summaryCards: summaryCards.value,
    commentsLineData: activeAnalytics.value.commentsLineData,
    sources: activeAnalytics.value.sources,
    sentiment: activeAnalytics.value.sentiment,
    quickInsights: quickInsights.value,
    topCustomers: topCustomers.value,
  });

  const rawTitle = analyticsHeader.value.title ?? "relatorio";
  const normalizedTitle = rawTitle
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s_-]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .toLowerCase();

  const today = new Date().toISOString().slice(0, 10);
  const fileName = `${normalizedTitle || "relatorio"}_${today}.pdf`;
  report.save(fileName);
}

const getSummaryIcon = (iconKey) => summaryIconMap[iconKey] ?? ChartBarIcon;
const getTrendIcon = (delta) =>
  delta >= 0 ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
const getTrendClass = (delta) =>
  delta >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600";
const insightIcon = SparklesIcon;

const route = useRoute();
const restaurantId = computed(() => route.params.id ?? "default");

const analyticsMock = {
  default: {
    name: "Restaurante Demo",
    analyticsHeader: {
      title: "Visão Geral do Restaurante",
      lastUpdated: "31/10/2025 às 08:42",
      period: "Últimos 90 dias",
    },
    summaryCards: [
      {
        id: "visits",
        title: "Acessos do site",
        value: "12.840",
        delta: 12,
        icon: "visits",
        subtitle: "Inclui buscas orgânicas e tráfego direto",
        accent: "border-amber-500",
      },
      {
        id: "comments",
        title: "Comentários recebidos",
        value: "248",
        delta: 18,
        icon: "comments",
        subtitle: "Novas avaliações em plataformas integradas",
        accent: "border-emerald-500",
      },
      {
        id: "favorites",
        title: "Clientes recorrentes",
        value: "82",
        delta: -4,
        icon: "favorites",
        subtitle: "Clientes com mais de 3 visitas no período",
        accent: "border-cyan-500",
      },
    ],
    commentsLineData: [
      { label: "Mai", comments: 42 },
      { label: "Jun", comments: 57 },
      { label: "Jul", comments: 61 },
      { label: "Ago", comments: 68 },
      { label: "Set", comments: 79 },
      { label: "Out", comments: 84 },
    ],
    sources: [
      { label: "Google Meu Negócio", value: 4800 },
      { label: "Redes sociais", value: 2520 },
      { label: "Aplicativo próprio", value: 1980 },
      { label: "Indicações", value: 1320 },
      { label: "Portais parceiros", value: 820 },
    ],
    sentiment: {
      positive: 72,
      neutral: 19,
      negative: 9,
    },
    quickInsights: [
      {
        id: "insight-1",
        title: "Pico de comentários nas quartas-feiras",
        description:
          "Considere promoções nesse dia para converter novos acessos.",
        accent: "bg-emerald-500",
      },
      {
        id: "insight-2",
        title: "Clientes de redes sociais convertem mais",
        description: "Reforce publicações com cardápios em vídeo no Instagram.",
        accent: "bg-amber-500",
      },
      {
        id: "insight-3",
        title: "Atenção aos comentários neutros",
        description:
          "31 avaliações neutras mencionam tempo de espera acima de 25 minutos.",
        accent: "bg-rose-500",
      },
    ],
    topCustomers: [
      {
        id: 1,
        name: "Maria Souza",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        lastVisit: "27/10/2025",
        comments: 6,
        averageRating: 4.8,
        favoriteDish: "Combinado Ebisu",
      },
      {
        id: 2,
        name: "João Pedro",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        lastVisit: "24/10/2025",
        comments: 4,
        averageRating: 4.5,
        favoriteDish: "Yakisoba Vegano",
      },
      {
        id: 3,
        name: "Ana Clara",
        avatar: "https://randomuser.me/api/portraits/women/81.jpg",
        lastVisit: "18/10/2025",
        comments: 3,
        averageRating: 4.9,
        favoriteDish: "Temaki Especial",
      },
    ],
  },
  1: {
    name: "Sabor Oriental",
    analyticsHeader: {
      title: "Sabor Oriental · Painel Administrativo",
      lastUpdated: "31/10/2025 às 08:42",
      period: "Agosto · Setembro · Outubro",
    },
    summaryCards: [
      {
        id: "visits",
        title: "Acessos no período",
        value: "9.430",
        delta: 15,
        icon: "visits",
        subtitle: "Tráfego digital consolidado",
        accent: "border-amber-500",
      },
      {
        id: "comments",
        title: "Novos comentários",
        value: "187",
        delta: 22,
        icon: "comments",
        subtitle: "Soma de avaliações internas e externas",
        accent: "border-emerald-500",
      },
      {
        id: "favorites",
        title: "Clientes VIP",
        value: "54",
        delta: 6,
        icon: "favorites",
        subtitle: "Clientes que visitaram 4x ou mais",
        accent: "border-cyan-500",
      },
    ],
    commentsLineData: [
      { label: "Ago", comments: 48 },
      { label: "Set", comments: 62 },
      { label: "Out", comments: 77 },
    ],
    sources: [
      { label: "Google Maps", value: 3120 },
      { label: "Instagram", value: 2040 },
      { label: "Delivery Apps", value: 1580 },
      { label: "WhatsApp", value: 970 },
      { label: "Eventos", value: 720 },
    ],
    sentiment: {
      positive: 75,
      neutral: 17,
      negative: 8,
    },
    quickInsights: [
      {
        id: "insight-1",
        title: "Promoções do jantar geraram +18% de visitas",
        description:
          "Clientes vindos do Instagram permanecem 32% mais tempo na página.",
        accent: "bg-emerald-500",
      },
      {
        id: "insight-2",
        title: "Comentários mencionam tempo de entrega",
        description: "12 avaliações neutras citam espera acima de 40 minutos.",
        accent: "bg-amber-500",
      },
      {
        id: "insight-3",
        title: "Potencial em eventos corporativos",
        description: "Pedidos para grupos aumentaram 26% no último mês.",
        accent: "bg-indigo-500",
      },
    ],
    topCustomers: [
      {
        id: 1,
        name: "Renata Lima",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        lastVisit: "28/10/2025",
        comments: 5,
        averageRating: 5,
        favoriteDish: "Combo Premium Koi",
      },
      {
        id: 2,
        name: "Bruno Albuquerque",
        avatar: "https://randomuser.me/api/portraits/men/76.jpg",
        lastVisit: "25/10/2025",
        comments: 4,
        averageRating: 4.7,
        favoriteDish: "Yakitori Especial",
      },
      {
        id: 3,
        name: "Letícia Gomes",
        avatar: "https://randomuser.me/api/portraits/women/95.jpg",
        lastVisit: "20/10/2025",
        comments: 3,
        averageRating: 4.9,
        favoriteDish: "Tempurá Crocante",
      },
    ],
  },
};

const activeAnalytics = computed(
  () => analyticsMock[restaurantId.value] ?? analyticsMock.default
);

const analyticsHeader = computed(() => activeAnalytics.value.analyticsHeader);
const summaryCards = computed(() => activeAnalytics.value.summaryCards);
const commentsLineData = computed(() => ({
  labels: activeAnalytics.value.commentsLineData.map((item) => item.label),
  datasets: [
    {
      label: "Comentários",
      data: activeAnalytics.value.commentsLineData.map((item) => item.comments),
      borderColor: "#f59e0b",
      backgroundColor: "rgba(251, 191, 36, 0.25)",
      pointBackgroundColor: "#d97706",
      tension: 0.4,
      borderWidth: 3,
      fill: true,
    },
  ],
}));

const sourceBarData = computed(() => ({
  labels: activeAnalytics.value.sources.map((item) => item.label),
  datasets: [
    {
      label: "Acessos",
      data: activeAnalytics.value.sources.map((item) => item.value),
      backgroundColor: [
        "rgba(245, 158, 11, 0.85)",
        "rgba(16, 185, 129, 0.85)",
        "rgba(14, 165, 233, 0.85)",
        "rgba(239, 68, 68, 0.85)",
        "rgba(107, 114, 128, 0.85)",
      ],
      borderRadius: 8,
      maxBarThickness: 42,
    },
  ],
}));

const sentimentData = computed(() => ({
  labels: ["Positivas", "Neutras", "Negativas"],
  datasets: [
    {
      data: [
        activeAnalytics.value.sentiment.positive,
        activeAnalytics.value.sentiment.neutral,
        activeAnalytics.value.sentiment.negative,
      ],
      backgroundColor: ["#22c55e", "#facc15", "#f87171"],
      borderWidth: 0,
    },
  ],
}));

const sentimentBreakdown = computed(() => [
  {
    label: "Avaliações positivas",
    value: activeAnalytics.value.sentiment.positive,
    color: "#22c55e",
  },
  {
    label: "Avaliações neutras",
    value: activeAnalytics.value.sentiment.neutral,
    color: "#facc15",
  },
  {
    label: "Avaliações negativas",
    value: activeAnalytics.value.sentiment.negative,
    color: "#f87171",
  },
]);

const quickInsights = computed(() => activeAnalytics.value.quickInsights);
const topCustomers = computed(() => activeAnalytics.value.topCustomers);

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: "#6b7280",
      },
      grid: {
        color: "rgba(209, 213, 219, 0.4)",
      },
    },
    x: {
      ticks: {
        color: "#6b7280",
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context) => ` ${context.parsed.y} comentários`,
      },
    },
  },
};

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "y",
  scales: {
    x: {
      ticks: {
        color: "#6b7280",
      },
      grid: {
        color: "rgba(209, 213, 219, 0.4)",
      },
    },
    y: {
      ticks: {
        color: "#6b7280",
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context) =>
          ` ${context.parsed.x.toLocaleString("pt-BR")} acessos`,
      },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        boxWidth: 10,
        color: "#374151",
      },
    },
  },
};

const formatDelta = (value) => {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}%`;
};
</script>
