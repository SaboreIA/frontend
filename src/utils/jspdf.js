import { jsPDF } from "jspdf";

const PRIMARY_AMBER = [245, 158, 11];
const TEXT_DARK = [17, 24, 39];
const TEXT_MUTED = [107, 114, 128];
const TEXT_LIGHT = [248, 250, 252];

const ACCENT_MAPPINGS = {
	amber: { border: [245, 158, 11], fill: [254, 243, 199] },
	emerald: { border: [16, 185, 129], fill: [209, 250, 229] },
	cyan: { border: [14, 165, 233], fill: [207, 250, 254] },
	rose: { border: [244, 63, 94], fill: [252, 231, 243] },
	indigo: { border: [99, 102, 241], fill: [224, 231, 255] },
	gray: { border: [75, 85, 99], fill: [243, 244, 246] },
};

function resolveAccent(accent = "", fallbackKey = "gray") {
	const entry = Object.entries(ACCENT_MAPPINGS).find(([key]) =>
		accent.includes(key)
	);
	return entry ? entry[1] : ACCENT_MAPPINGS[fallbackKey];
}

function ensureSpace(doc, currentY, neededHeight, topOffset) {
	const pageHeight = doc.internal.pageSize.getHeight();
	const bottomMargin = 20;
	if (currentY + neededHeight > pageHeight - bottomMargin) {
		doc.addPage();
		return topOffset;
	}
	return currentY;
}

function drawHeader(doc, margin, analyticsHeader, restaurantName) {
	const pageWidth = doc.internal.pageSize.getWidth();
	doc.setFillColor(...PRIMARY_AMBER);
	doc.rect(0, 0, pageWidth, 50, "F");

	doc.setTextColor(...TEXT_LIGHT);
	doc.setFont("helvetica", "bold");
	doc.setFontSize(18);
	doc.text("Relatório Executivo", margin, 18);

	doc.setFont("helvetica", "medium");
	doc.setFontSize(14);
	doc.text(analyticsHeader?.title ?? "Visão Geral", margin, 27);

	doc.setFont("helvetica", "normal");
	doc.setFontSize(11);
	doc.text(`Restaurante: ${restaurantName}`, margin, 34);
	doc.text(
		`Atualizado em: ${analyticsHeader?.lastUpdated ?? "--"}`,
		margin,
		39
	);
	doc.text(`Período analisado: ${analyticsHeader?.period ?? "--"}`, margin, 44);

	doc.setFont("helvetica", "normal");
	doc.setTextColor(...TEXT_MUTED);
}

function drawSummaryCards(doc, margin, startY, cards = []) {
	if (!cards.length) {
		return startY;
	}

	const pageWidth = doc.internal.pageSize.getWidth();
	const cardsPerRow = 3;
	const gap = 10;
	const availableWidth = pageWidth - margin * 2 - gap * (cardsPerRow - 1);
	const cardWidth = availableWidth / cardsPerRow;
	const cardHeight = 38;

	let cursorY = startY;
	cards.forEach((card, index) => {
		const column = index % cardsPerRow;
		const row = Math.floor(index / cardsPerRow);
		const x = margin + column * (cardWidth + gap);
		const y = cursorY + row * (cardHeight + gap);

		const accent = resolveAccent(card.accent);
		doc.setDrawColor(...accent.border);
		doc.setLineWidth(0.6);
		doc.setFillColor(...accent.fill);
		doc.roundedRect(x, y, cardWidth, cardHeight, 3, 3, "FD");

		doc.setFont("helvetica", "bold");
		doc.setFontSize(10);
		doc.setTextColor(...TEXT_MUTED);
		doc.text(card.title ?? "Indicador", x + 5, y + 9);

		const delta = Number(card.delta ?? 0);
		const deltaColor = delta > 0 ? [22, 163, 74] : delta < 0 ? [239, 68, 68] : [75, 85, 99];
		doc.setFontSize(9);
		doc.setTextColor(...deltaColor);
		const deltaText = `${delta > 0 ? "+" : ""}${delta}%`; 
		doc.text(deltaText, x + cardWidth - doc.getTextWidth(deltaText) - 5, y + 9);

		doc.setFont("helvetica", "bold");
		doc.setFontSize(18);
		doc.setTextColor(...TEXT_DARK);
		doc.text(String(card.value ?? "--"), x + 5, y + 21);

		doc.setFont("helvetica", "normal");
		doc.setFontSize(9);
		doc.setTextColor(...TEXT_MUTED);
		const subtitle = doc.splitTextToSize(card.subtitle ?? "", cardWidth - 10);
		doc.text(subtitle, x + 5, y + 29);
	});

	const rows = Math.ceil(cards.length / cardsPerRow);
	return startY + rows * (cardHeight + gap);
}

function drawSectionTitle(doc, margin, cursorY, title, subtitle = "") {
	doc.setFont("helvetica", "bold");
	doc.setFontSize(13);
	doc.setTextColor(...TEXT_DARK);
	doc.text(title, margin, cursorY);

	if (subtitle) {
		doc.setFont("helvetica", "normal");
		doc.setFontSize(10);
		doc.setTextColor(...TEXT_MUTED);
		doc.text(doc.splitTextToSize(subtitle, 120), margin, cursorY + 6);
		return cursorY + 12;
	}

	return cursorY + 6;
}

function drawSimpleTable(doc, margin, startY, headers, rows, columnWidths) {
	const rowHeight = 8;
	let cursorY = startY;

	doc.setFillColor(243, 244, 246);
	doc.setTextColor(...TEXT_DARK);
	doc.setFont("helvetica", "bold");
	doc.setFontSize(10);

	let x = margin;
	headers.forEach((header, index) => {
		const width = columnWidths[index];
		doc.rect(x, cursorY, width, rowHeight, "F");
		doc.text(header, x + 2, cursorY + 5.5);
		x += width;
	});

	cursorY += rowHeight;
	doc.setFont("helvetica", "normal");
	doc.setFontSize(10);
	doc.setTextColor(...TEXT_DARK);

	rows.forEach((row) => {
		x = margin;
		row.forEach((cell, index) => {
			const width = columnWidths[index];
			doc.rect(x, cursorY, width, rowHeight);
			const cellText = doc.splitTextToSize(String(cell ?? ""), width - 3);
			doc.text(cellText, x + 2, cursorY + 5);
			x += width;
		});
		cursorY += rowHeight;
	});

	return cursorY;
}

function drawSentimentBars(doc, margin, startY, sentiment = {}) {
	const labels = [
		{ key: "positive", label: "Positivas", color: [34, 197, 94] },
		{ key: "neutral", label: "Neutras", color: [250, 204, 21] },
		{ key: "negative", label: "Negativas", color: [248, 113, 113] },
	];

	let cursorY = startY;
	labels.forEach(({ key, label, color }) => {
		const value = Number(sentiment[key] ?? 0);
		const barWidth = Math.max(10, (value / 100) * 80);

		doc.setTextColor(...TEXT_DARK);
		doc.setFont("helvetica", "normal");
		doc.setFontSize(10);
		doc.text(`${label} (${value}%)`, margin, cursorY + 4);

		doc.setFillColor(...color);
		doc.roundedRect(margin + 50, cursorY, barWidth, 6, 2, 2, "F");

		cursorY += 10;
	});

	return cursorY;
}

function drawQuickInsights(doc, margin, startY, insights = []) {
	if (!insights.length) {
		return startY;
	}

	let cursorY = startY;
	doc.setFont("helvetica", "normal");
	doc.setFontSize(10);

	insights.forEach((insight) => {
		const accent = resolveAccent(insight.accent, "amber");
		doc.setFillColor(...accent.border);
		doc.circle(margin + 2, cursorY - 1.5, 2, "F");

		doc.setTextColor(...TEXT_DARK);
		doc.setFont("helvetica", "bold");
		doc.text(insight.title ?? "Insight", margin + 8, cursorY);

		doc.setFont("helvetica", "normal");
		doc.setTextColor(...TEXT_MUTED);
		const description = doc.splitTextToSize(insight.description ?? "", 140);
		doc.text(description, margin + 8, cursorY + 5);

		cursorY += 12 + (description.length - 1) * 5;
	});

	return cursorY;
}

export function generateRestaurantReport(analyticsData = {}) {
	const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
	const margin = 18;

	drawHeader(doc, margin, analyticsData.analyticsHeader, analyticsData.restaurantName ?? "Restaurante");

	let cursorY = 62;
	cursorY = drawSummaryCards(doc, margin, cursorY, analyticsData.summaryCards);
	cursorY += 6;

	cursorY = ensureSpace(doc, cursorY, 36, 24);
	cursorY = drawSectionTitle(
		doc,
		margin,
		cursorY,
		"Comentários por período",
		"Volume de avaliações recebidas ao longo do período selecionado."
	);

	cursorY = ensureSpace(doc, cursorY, 12 + (analyticsData.commentsLineData?.length ?? 0) * 8, 24);
	const commentRows = (analyticsData.commentsLineData ?? []).map((item) => [
		item.label,
		`${item.comments} comentários`,
	]);
	cursorY = drawSimpleTable(doc, margin, cursorY, ["Período", "Total"], commentRows, [60, 60]);
	cursorY += 6;

	const totalComments = (analyticsData.commentsLineData ?? []).reduce(
		(sum, item) => sum + Number(item.comments ?? 0),
		0
	);
	const avgComments = commentRows.length
		? Math.round(totalComments / commentRows.length)
		: 0;
	doc.setFont("helvetica", "italic");
	doc.setFontSize(9);
	doc.setTextColor(...TEXT_MUTED);
	doc.text(
		`Total acumulado no período: ${totalComments} · Média mensal: ${avgComments}`,
		margin,
		cursorY
	);
	cursorY += 10;

	cursorY = ensureSpace(doc, cursorY, 40, 24);
	cursorY = drawSectionTitle(
		doc,
		margin,
		cursorY,
		"Origem dos acessos",
		"Principais canais de aquisição de tráfego para o restaurante."
	);

	const sourceRows = (analyticsData.sources ?? []).map((item) => [
		item.label,
		`${Number(item.value ?? 0).toLocaleString("pt-BR")} acessos`,
	]);
	cursorY = drawSimpleTable(doc, margin, cursorY, ["Canal", "Acessos"], sourceRows, [90, 60]);
	cursorY += 10;

	cursorY = ensureSpace(doc, cursorY, 40, 24);
	cursorY = drawSectionTitle(
		doc,
		margin,
		cursorY,
		"Sentimento das avaliações",
		"Distribuição das avaliações positivas, neutras e negativas."
	);
	cursorY = drawSentimentBars(doc, margin, cursorY + 2, analyticsData.sentiment);
	cursorY += 6;

	cursorY = ensureSpace(doc, cursorY, 50, 24);
	cursorY = drawSectionTitle(
		doc,
		margin,
		cursorY,
		"Insights rápidos",
		"Recomendações automáticas baseadas no comportamento recente dos clientes."
	);
	cursorY = drawQuickInsights(doc, margin, cursorY + 6, analyticsData.quickInsights);
	cursorY += 4;

	cursorY = ensureSpace(doc, cursorY, 40, 24);
	cursorY = drawSectionTitle(
		doc,
		margin,
		cursorY,
		"Clientes que mais interagem",
		"Ranking dos clientes com maior engajamento no período."
	);

	const customerRows = (analyticsData.topCustomers ?? []).map((customer) => [
		customer.name,
		customer.lastVisit,
		`${customer.comments} comentários`,
		`${Number(customer.averageRating ?? 0).toFixed(1)} ★`,
	]);

	drawSimpleTable(
		doc,
		margin,
		cursorY,
		["Cliente", "Último acesso", "Interações", "Nota média"],
		customerRows,
		[70, 35, 35, 30]
	);

	return doc;
}

export default generateRestaurantReport;