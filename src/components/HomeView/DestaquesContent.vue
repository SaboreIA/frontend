<template>
  <div
    class="bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1 group"
  >
    <div class="relative h-48 overflow-hidden">
      <img
        :src="restaurante.coverImageUrl"
        :alt="`Imagem de ${restaurante.name}`"
        class="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div
        :class="[
          'absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md z-10',
          statusDisplay.class,
        ]"
      >
        {{ statusDisplay.text }}
      </div>
    </div>

    <div class="p-5">
      <div class="flex justify-between items-start mb-2">
        <h2 class="text-xl font-semibold text-gray-900 truncate">
          {{ restaurante.name }}
        </h2>

        <div class="flex items-center space-x-1">
          <svg
            class="w-5 h-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <span class="text-gray-700 font-bold">{{ displayRating }}</span>
        </div>
      </div>

      <span
        v-if="displayCategory"
        class="inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-medium mb-3"
      >
        {{ displayCategory }}
      </span>

      <span
        v-else
        class="inline-block bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full font-medium mb-3"
      >
        Sem Categoria
      </span>

      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ restaurante.description }}
      </p>

      <button
        @click="handleClick"
        class="w-full bg-yellow-600 text-white py-2 rounded-lg font-medium hover:bg-yellow-700 transition duration-150"
      >
        Ver Detalhes
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  restaurante: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    default: () => [],
  },
  averageRating: {
    type: [Number, String],
    default: null,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
});

const router = useRouter();
const showDebug = true;

const extractAverageRating = (restaurant) => {
  if (!restaurant || typeof restaurant !== 'object') return null;

  const ratingCandidates = [
    props.averageRating,
    restaurant.averageRating,
    restaurant.avgRating,
    restaurant.rating,
    restaurant.score,
    restaurant.mediaAvaliacoes,
  ];

  const rating = ratingCandidates.find((value) => value != null && value !== "");
  return rating != null ? Number(rating) : null;
};

function normalizeTag(t) {
  if (t == null) return null;
  if (typeof t === "string" && t.trim() !== "") return t.trim();
  if (typeof t === "object") {
    if (typeof t.name === "string" && t.name.trim() !== "") return t.name.trim();
    if (typeof t.title === "string" && t.title.trim() !== "") return t.title.trim();
    if (t.tag && typeof t.tag.name === "string" && t.tag.name.trim() !== "") return t.tag.name.trim();
    if (t.category && typeof t.category.name === "string" && t.category.name.trim() !== "") return t.category.name.trim();
    if (t.Category && typeof t.Category.name === "string" && t.Category.name.trim() !== "") return t.Category.name.trim();
    for (const val of Object.values(t)) {
      if (val && typeof val === "object" && typeof val.name === "string" && val.name.trim() !== "") return val.name.trim();
      if (typeof val === "string" && val.trim() !== "") return val.trim();
    }
  }
  return null;
}

const statusDisplay = computed(() => {
  const now = new Date();
  const [h, m] = props.restaurante.openTime?.split(":").map(Number) || [0, 0];
  const [ch, cm] = props.restaurante.closeTime?.split(":").map(Number) || [0, 0];

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = h * 60 + m;
  const closeMinutes = ch * 60 + cm;

  const isOpen =
    closeMinutes > openMinutes
      ? currentMinutes >= openMinutes && currentMinutes <= closeMinutes
      : currentMinutes >= openMinutes || currentMinutes <= closeMinutes;

  return isOpen
    ? { text: "ABERTO", class: "bg-green-600 text-white" }
    : { text: "FECHADO", class: "bg-red-600 text-white" };
});

const displayRating = computed(() => {
  const rawRating = extractAverageRating(props.restaurante);

  if (rawRating != null && !isNaN(rawRating)) {
    const formatted = rawRating.toFixed(1).replace(".", ",");
    return `${formatted}`;
  }
  return "N/A";
});

const displayCategory = computed(() => {
  const r = props.restaurante || {};

  const tagIds = Array.isArray(r.tagIds) ? r.tagIds : (Array.isArray(r.tags) ? r.tags.map(t => (typeof t === 'object' ? t.id ?? null : t)) : []);

  if (Array.isArray(tagIds) && tagIds.length > 0 && Array.isArray(props.categories) && props.categories.length > 0) {
    for (const id of tagIds) {
      const match = props.categories.find(c => Number(c.id) === Number(id));
      if (match && match.name) return match.name;
    }
  }

  const tags = r.tags;
  if (Array.isArray(tags) && tags.length > 0) {
    for (const t of tags) {
      const n = normalizeTag(t);
      if (n) return n;
    }
  }

  const alternatives = [
    r.tag,
    r.category,
    r.Category,
    Array.isArray(r.categories) ? r.categories[0] : null,
    Array.isArray(r.Categories) ? r.Categories[0] : null,
    r.primaryTag,
  ];

  for (const alt of alternatives) {
    const n = normalizeTag(alt);
    if (n) return n;
  }

  if (typeof r.tags === "string" && r.tags.trim() !== "") {
    return r.tags.split(",")[0].trim();
  }

  return "";
});

const handleClick = () => {
  router.push({
    name: "restaurante-detalhe",
    params: { id: props.restaurante.id },
  });
};

watch(
  () => [props.restaurante, props.categories],
  () => {
    console.debug("[RestCard] restaurante.tags ->", props.restaurante?.tags);
    console.debug("[RestCard] restaurante.tagIds ->", props.restaurante?.tagIds);
    console.debug("[RestCard] categories (pai) ->", props.categories);
    console.debug("[RestCard] displayCategory ->", displayCategory.value);
  },
  { immediate: true, deep: false }
);
</script>