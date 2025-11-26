import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/api/stores/authStore';
import { useToastStore } from '@/api/stores/toastStore';
import { fetchTags } from '@/api/tags';
import {
  fetchRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  uploadRestaurantImages,
} from '@/api/restaurants';

const TAG_LIMIT = 10;
const DAYS = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Segunda-feira' },
  { value: 2, label: 'Terça-feira' },
  { value: 3, label: 'Quarta-feira' },
  { value: 4, label: 'Quinta-feira' },
  { value: 5, label: 'Sexta-feira' },
  { value: 6, label: 'Sábado' },
];

const createEmptyForm = () => ({
  name: '',
  phoneNumber: '',
  email: '',
  description: '',
  site: '',
  menu: '',
  coverImageUrl: '',
  imageUrl1: '',
  imageUrl2: '',
  imageUrl3: '',
  isActive: true,
  openDay: 1,
  closeDay: 5,
  openTime: '',
  closeTime: '',
  address: {
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    country: '',
  },
  tagIds: [],
});

const createEmptyMedia = () => ({
  coverImage: null,
  image1: null,
  image2: null,
  image3: null,
});

export const useRestaurantEdit = ({
  restaurantId,
  onUpdated = () => {},
  onDeleted = () => {},
}) => {
  const router = useRouter();
  const authStore = useAuthStore();
  const toastStore = useToastStore();
  const restaurantIdRef = restaurantId ?? ref(null);

  const restaurant = ref(null);
  const loading = ref(true);
  const error = ref(false);
  const isModalOpen = ref(false);
  const isSubmitting = ref(false);
  const isDeleting = ref(false);
  const tagsLoading = ref(false);
  const tagsError = ref('');
  const availableTags = ref([]);

  const form = reactive(createEmptyForm());
  const media = reactive(createEmptyMedia());

  const selectedTagCount = computed(() => form.tagIds.length);
  const disableNewTagSelection = computed(() => selectedTagCount.value >= TAG_LIMIT);
  const hasNewMedia = computed(
    () => Boolean(media.coverImage || media.image1 || media.image2 || media.image3)
  );

  const isTagSelected = (tagId) => form.tagIds.includes(tagId);

  const toggleTag = (tagId) => {
    const current = new Set(form.tagIds);
    if (current.has(tagId)) {
      current.delete(tagId);
    } else {
      if (current.size >= TAG_LIMIT) return;
      current.add(tagId);
    }
    form.tagIds = Array.from(current);
  };

  const resetMedia = () => {
    Object.assign(media, createEmptyMedia());
  };

  const hydrateForm = (data) => {
    if (!data) return;
    form.name = data.name || '';
    form.phoneNumber = data.phoneNumber || '';
    form.email = data.email || '';
    form.description = data.description || '';
    form.site = data.site || '';
    form.menu = data.menu || '';
    form.coverImageUrl = data.coverImageUrl || '';
    form.imageUrl1 = data.imageUrl1 || '';
    form.imageUrl2 = data.imageUrl2 || '';
    form.imageUrl3 = data.imageUrl3 || '';
    form.isActive = typeof data.isActive === 'boolean' ? data.isActive : true;
    form.openDay = data.openDay ?? 1;
    form.closeDay = data.closeDay ?? 5;
    form.openTime = data.openTime || '';
    form.closeTime = data.closeTime || '';
    form.address.zipCode = data.address?.zipCode || '';
    form.address.street = data.address?.street || '';
    form.address.number = data.address?.number || '';
    form.address.complement = data.address?.complement || '';
    form.address.city = data.address?.city || '';
    form.address.state = data.address?.state || '';
    form.address.country = data.address?.country || '';
    form.tagIds = Array.isArray(data.tagIds) ? [...data.tagIds] : [];
  };

  const buildUpdatePayload = () => ({
    name: form.name,
    phoneNumber: form.phoneNumber,
    email: form.email,
    description: form.description,
    site: form.site,
    menu: form.menu,
    coverImageUrl: form.coverImageUrl,
    imageUrl1: form.imageUrl1,
    imageUrl2: form.imageUrl2,
    imageUrl3: form.imageUrl3,
    isActive: form.isActive,
    openDay: form.openDay,
    closeDay: form.closeDay,
    openTime: form.openTime,
    closeTime: form.closeTime,
    address: { ...form.address },
    tagIds: [...form.tagIds],
  });

  const buildMediaPayload = () => ({
    coverImage: media.coverImage,
    image1: media.image1,
    image2: media.image2,
    image3: media.image3,
  });

  const updateMediaField = (field, file) => {
    media[field] = file;
  };

  const redirectToLogin = () => {
    router.push({
      name: 'login',
      query: { redirect: router.currentRoute.value.fullPath },
    });
  };

  const ensureAuthenticated = (message) => {
    if (authStore.isLoggedIn) return true;
    toastStore.warning({
      title: 'Autenticação necessária',
      message: message || 'Você precisa estar autenticado para continuar.',
    });
    redirectToLogin();
    return false;
  };

  const handleAuthError = (error, fallbackMessage) => {
    if (error?.response?.status === 401) {
      authStore.logout();
      toastStore.warning({
        title: 'Sessão expirada',
        message: 'Faça login novamente para continuar.',
      });
      redirectToLogin();
    } else {
      toastStore.error({
        title: 'Ops...',
        message: error?.response?.data?.message || fallbackMessage,
      });
    }
  };

  const loadTags = async () => {
    tagsLoading.value = true;
    tagsError.value = '';
    try {
      const { data } = await fetchTags();
      availableTags.value = Array.isArray(data) ? data : [];
    } catch (error) {
      tagsError.value = error?.response?.data?.message || 'Não foi possível carregar as tags disponíveis.';
    } finally {
      tagsLoading.value = false;
    }
  };

  const fetchRestaurant = async (options = {}) => {
    if (!restaurantIdRef?.value) return;
    const { silent = false } = options;
    if (!silent) {
      loading.value = true;
    }
    error.value = false;
    try {
      const { data } = await fetchRestaurantById(restaurantIdRef.value);
      restaurant.value = data;
      hydrateForm(data);
    } catch (err) {
      error.value = true;
    } finally {
      if (!silent) {
        loading.value = false;
      }
    }
  };

  const openModal = () => {
    if (!restaurant.value) return;
    if (!ensureAuthenticated('Faça login para editar o restaurante.')) return;
    resetMedia();
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    resetMedia();
  };

  const submitEdit = async () => {
    if (!restaurantIdRef?.value) return;
    if (!ensureAuthenticated('Você precisa estar autenticado para editar o restaurante.')) return;
    isSubmitting.value = true;
    try {
      const { data } = await updateRestaurant(restaurantIdRef.value, buildUpdatePayload());
      restaurant.value = data;

      if (hasNewMedia.value) {
        await uploadRestaurantImages(restaurantIdRef.value, buildMediaPayload());
        await fetchRestaurant({ silent: true });
      } else {
        hydrateForm(data);
      }

      closeModal();
      toastStore.success('Restaurante atualizado com sucesso!');
      onUpdated(restaurant.value);
    } catch (error) {
      console.error('Erro ao atualizar restaurante:', error);
      handleAuthError(error, 'Não foi possível atualizar o restaurante.');
    } finally {
      isSubmitting.value = false;
      resetMedia();
    }
  };

  const confirmDelete = async () => {
    if (!restaurantIdRef?.value) return;
    if (!ensureAuthenticated('Você precisa estar autenticado para excluir o restaurante.')) return;
    const confirmation = window.confirm('Tem certeza que deseja excluir este restaurante? Esta ação é irreversível.');
    if (!confirmation) return;
    isDeleting.value = true;
    try {
      await deleteRestaurant(restaurantIdRef.value);
      toastStore.success('Restaurante excluído com sucesso.');
      onDeleted();
    } catch (error) {
      console.error('Erro ao excluir restaurante:', error);
      handleAuthError(error, 'Não foi possível excluir o restaurante.');
    } finally {
      isDeleting.value = false;
    }
  };

  watch(
    () => restaurantIdRef?.value,
    (newId) => {
      if (newId) {
        fetchRestaurant();
      }
    },
    { immediate: true }
  );

  onMounted(loadTags);

  return {
    restaurant,
    loading,
    error,
    form,
    media,
    isModalOpen,
    isSubmitting,
    isDeleting,
    availableTags,
    tagsLoading,
    tagsError,
    TAG_LIMIT,
    days: DAYS,
    selectedTagCount,
    disableNewTagSelection,
    isTagSelected,
    toggleTag,
    updateMediaField,
    openModal,
    closeModal,
    submitEdit,
    confirmDelete,
  };
};
