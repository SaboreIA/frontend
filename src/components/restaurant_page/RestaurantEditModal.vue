<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold text-gray-900">Editar restaurante</h2>
          <button class="text-gray-500 hover:text-gray-700" @click="$emit('close')" aria-label="Fechar modal">
            ✕
          </button>
        </div>

        <form class="space-y-5" @submit.prevent="$emit('submit')">
          <section class="section-card">
            <header class="section-header">
              <h2>Informações principais</h2>
              <p>Campos com * são obrigatórios.</p>
            </header>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label class="field">
                <span>Nome *</span>
                <input v-model="form.name" type="text" required />
              </label>
              <label class="field">
                <span>Telefone *</span>
                <input v-model="form.phoneNumber" type="text" />
              </label>
              <label class="field">
                <span>E-mail</span>
                <input v-model="form.email" type="email" />
              </label>
              <label class="field">
                <span>Site</span>
                <input v-model="form.site" type="url" />
              </label>
              <label class="field">
                <span>Menu</span>
                <input v-model="form.menu" type="url" />
              </label>
              <label class="field">
                <span>Status</span>
                <select v-model="form.isActive">
                  <option :value="true">Ativo</option>
                  <option :value="false">Inativo</option>
                </select>
              </label>
            </div>

            <label class="field">
              <span>Descrição *</span>
              <textarea
                rows="4"
                v-model="form.description"
                placeholder="Conte a história do restaurante, especialidades, atmosfera..."
              ></textarea>
            </label>
          </section>

          <section class="section-card">
            <header class="section-header">
              <h2>Funcionamento</h2>
            </header>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label class="field">
                <span>Dia de abertura *</span>
                <select v-model.number="form.openDay">
                  <option v-for="day in days" :key="`open-${day.value}`" :value="day.value">
                    {{ day.label }}
                  </option>
                </select>
              </label>
              <label class="field">
                <span>Dia de fechamento *</span>
                <select v-model.number="form.closeDay">
                  <option v-for="day in days" :key="`close-${day.value}`" :value="day.value">
                    {{ day.label }}
                  </option>
                </select>
              </label>
              <label class="field">
                <span>Hora de abertura *</span>
                <input v-model="form.openTime" type="time" />
              </label>
              <label class="field">
                <span>Hora de fechamento *</span>
                <input v-model="form.closeTime" type="time" />
              </label>
            </div>
          </section>

          <section class="section-card">
            <header class="section-header">
              <h2>Endereço</h2>
            </header>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label class="field">
                <span>CEP</span>
                <input v-model="form.address.zipCode" type="text" />
              </label>
              <label class="field">
                <span>Rua</span>
                <input v-model="form.address.street" type="text" />
              </label>
              <label class="field">
                <span>Número</span>
                <input v-model="form.address.number" type="text" />
              </label>
              <label class="field">
                <span>Complemento</span>
                <input v-model="form.address.complement" type="text" />
              </label>
              <label class="field">
                <span>Cidade</span>
                <input v-model="form.address.city" type="text" />
              </label>
              <label class="field">
                <span>Estado</span>
                <input v-model="form.address.state" type="text" />
              </label>
              <label class="field md:col-span-2">
                <span>País</span>
                <input v-model="form.address.country" type="text" />
              </label>
            </div>
          </section>

          <section class="section-card">
            <header class="section-header">
              <h2>Imagens</h2>
            </header>

            <ImageCropInput
              label="Imagem de capa"
              :required="true"
              :aspect-ratio="16 / 9"
              :initial-preview="form.coverImageUrl"
              :model-value="media.coverImage"
              @update:model-value="(file) => emitUpdateMedia('coverImage', file)"
            />

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ImageCropInput
                label="Imagem 1"
                :initial-preview="form.imageUrl1"
                :model-value="media.image1"
                :aspect-ratio="4 / 3"
                @update:model-value="(file) => emitUpdateMedia('image1', file)"
              />
              <ImageCropInput
                label="Imagem 2"
                :initial-preview="form.imageUrl2"
                :model-value="media.image2"
                :aspect-ratio="4 / 3"
                @update:model-value="(file) => emitUpdateMedia('image2', file)"
              />
              <ImageCropInput
                label="Imagem 3"
                :initial-preview="form.imageUrl3"
                :model-value="media.image3"
                :aspect-ratio="4 / 3"
                @update:model-value="(file) => emitUpdateMedia('image3', file)"
              />
            </div>

            <p class="text-xs text-gray-500">Novas imagens serão enviadas ao Cloudinary após salvar as alterações.</p>
          </section>

          <section class="section-card">
            <header class="section-header">
              <h2>Tags associadas</h2>
              <p>Selecione até {{ tagLimit }} tags para destacar o restaurante.</p>
            </header>
            <div class="space-y-3">
              <div class="flex items-center justify-between text-sm font-semibold text-gray-700">
                <span>Tags do restaurante</span>
                <span class="text-xs font-normal text-gray-500">{{ selectedTagCount }}/{{ tagLimit }} selecionadas</span>
              </div>
              <p v-if="tagsLoading" class="text-sm text-gray-500">Carregando tags...</p>
              <p v-else-if="tagsError" class="text-sm text-red-600">{{ tagsError }}</p>
              <p v-else-if="!availableTags.length" class="text-sm text-gray-500">Nenhuma tag disponível no momento.</p>
              <div v-else class="flex flex-wrap gap-3">
                <button
                  v-for="tag in availableTags"
                  :key="tag.id"
                  type="button"
                  class="tag-chip"
                  :class="{
                    'tag-chip--active': isTagSelected(tag.id),
                    'tag-chip--disabled': disableNewTagSelection && !isTagSelected(tag.id),
                  }"
                  @click="$emit('toggle-tag', tag.id)"
                  :disabled="disableNewTagSelection && !isTagSelected(tag.id)"
                >
                  {{ tag.name }}
                </button>
              </div>
              <p v-if="disableNewTagSelection && !tagsLoading" class="text-xs text-amber-600">
                Limite máximo de {{ tagLimit }} tags atingido.
              </p>
            </div>
          </section>

          <div class="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
              @click="$emit('close')"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-70"
              :disabled="isSubmitting"
            >
              <svg v-if="isSubmitting" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <span>{{ isSubmitting ? 'Salvando...' : 'Salvar alterações' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import ImageCropInput from '../restaurant_form/ImageCropInput.vue';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  form: {
    type: Object,
    required: true,
  },
  media: {
    type: Object,
    required: true,
  },
  days: {
    type: Array,
    required: true,
  },
  availableTags: {
    type: Array,
    required: true,
  },
  tagsLoading: {
    type: Boolean,
    default: false,
  },
  tagsError: {
    type: String,
    default: '',
  },
  tagLimit: {
    type: Number,
    required: true,
  },
  selectedTagCount: {
    type: Number,
    required: true,
  },
  disableNewTagSelection: {
    type: Boolean,
    default: false,
  },
  isTagSelected: {
    type: Function,
    required: true,
  },
  isSubmitting: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'submit', 'toggle-tag', 'update-media']);

const emitUpdateMedia = (field, file) => {
  emit('update-media', { field, file });
};
</script>

<style scoped>
.section-card {
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1.25rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 10px 30px -20px rgba(15, 23, 42, 0.25);
}

.section-header h2 {
  font-size: 1.15rem;
  font-weight: 600;
  color: #111827;
}

.section-header p {
  font-size: 0.9rem;
  color: #6b7280;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
}

.field input,
.field select,
.field textarea {
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  padding: 0.65rem 1rem;
  font-size: 1rem;
  color: #111827;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  background-color: #fff;
}

.field textarea {
  resize: vertical;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25);
}

.tag-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  background-color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s ease;
}

.tag-chip--active {
  background-color: #065f46;
  color: #fff;
  border-color: #065f46;
  box-shadow: 0 8px 20px -6px rgba(6, 95, 70, 0.5);
}

.tag-chip--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
