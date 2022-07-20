<template>
  <Loading v-if="isLoading" />
  <ErrorAlert v-if="errorMessage" class="mx-auto w-80 mt-12" :error-message="errorMessage" />
  <div class="card sm:w-[26rem] w-full mt-8 bg-base-100 shadow-xl mx-3">
    <section v-if="!isEditing" class="grid grid-cols-12 place-items-end p-4">
      <div class="dropdown dropdown-end col-span-12">
        <label tabindex="0" class="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-5 h-5 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a class="fill-current" @click="setEditingProfile(true)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 512 512">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"
                />
              </svg>
              Edit
            </a>
          </li>
          <li>
            <a class="fill-red-500" @click="setModalOpened(true)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 512 512">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
                />
              </svg>
              Delete Account
            </a>
          </li>
        </ul>
      </div>
    </section>

    <section class="grid place-items-center mt-2 mb-6">
      <div class="avatar">
        <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img v-if="profile?.avatar" :src="profile?.avatar?.url" alt="avatar" />
          <img v-else src="../assets/default-avatar.svg" alt="avatar" />
        </div>
      </div>
    </section>

    <section class="grid p-4">
      <ValidatedForm
        v-if="isEditing"
        v-slot="{ errors, values }"
        :validation-schema="updateProfileValidationSchema"
      >
        <section class="grid place-items-center">
          <Field
            name="name"
            type="text"
            placeholder="Name"
            class="input input-bordered w-full mt-2"
            :class="{ 'input-primary': !errors.name, 'input-error': errors.name }"
            :value="profile.name"
          />
          <label class="label">
            <ErrorMessage as="span" name="name" class="label-text-alt text-error" />
          </label>

          <Field
            name="breed"
            as="select"
            class="select w-full mt-2"
            :class="{ 'input-primary': !errors.breed, 'input-error': errors.breed }"
            :value="profile?.breed"
          >
            <option :value="profile?.breed">{{ profile?.breed }}</option>
            <option v-for="(breed, index) in breeds" :key="index" :value="breed">
              {{ breed }}
            </option>
          </Field>
          <label class="label">
            <ErrorMessage as="span" name="breed" class="label-text-alt text-error" />
          </label>

          <Field
            name="gender"
            as="select"
            class="select w-full mt-2"
            :class="{ 'input-primary': !errors?.gender, 'input-error': errors?.gender }"
            :value="profile?.gender"
          >
            <option :value="profile?.gender">{{ capitalize(profile?.gender) }}</option>
            <option v-if="profile?.gender === 'female'" value="male">Male</option>
            <option v-else value="female">Female</option>
          </Field>
          <label class="label">
            <ErrorMessage as="span" name="gender" class="label-text-alt text-error" />
          </label>

          <Field
            name="location"
            type="text"
            placeholder="City, Country"
            class="input input-bordered w-full mt-2"
            :class="{ 'input-primary': !errors?.location, 'input-error': errors?.location }"
            :value="profile?.location"
          />
          <label class="label">
            <ErrorMessage as="span" name="location" class="label-text-alt text-error" />
          </label>
        </section>
        <section class="flex justify-end">
          <button
            class="btn btn-sm btn-link text-neutral mt-6 mr-2"
            @click="setEditingProfile(false)"
          >
            Cancel
          </button>
          <button class="btn btn-sm mt-6" @click="handleProfileUpdate(values)">Save</button>
        </section>
      </ValidatedForm>

      <section v-else>
        <div class="text-left">
          <div class="text-xl font-extrabold">
            {{ capitalize(profile?.name) }}
            <span class="ml-2 text-primary">{{ profile?.age }}</span>
          </div>

          <section class="space-x-2">
            <div class="badge badge-lg mt-4 gap-2">
              Breed <span class="font-extrabold">{{ profile?.breed }}</span>
            </div>

            <div class="badge badge-lg mt-4 gap-2">
              Gender
              <span class="font-extrabold">{{ capitalize(profile?.gender) }}</span>
            </div>

            <div class="badge badge-lg mt-4 gap-2">
              <span class="font-extrabold">{{ location?.[0] }}</span>
              {{ location?.[1] }}
            </div>
          </section>
        </div>
      </section>
    </section>
  </div>

  <DeleteAccountModal v-model="isModalOpened" @modal-opened="(value) => setModalOpened(value)" />
</template>
<script>
import DeleteAccountModal from "../components/DeleteAccountModal.vue";
import ErrorAlert from "../components/ErrorAlert.vue";
import Loading from "../components/Loading.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { capitalizeFirstLetter } from "../helpers/capitalize-first-letter";
import { getBreeds, updateProfile } from "../services";
import { mapGetters, mapMutations } from "vuex";
import { splitByComma } from "../helpers/split-by-comma";
import { updateProfileValidationSchema } from "../validators/profile.validator";

export default {
  components: {
    ValidatedForm: Form,
    Field,
    ErrorMessage,
    Loading,
    ErrorAlert,
    DeleteAccountModal,
  },
  data() {
    return {
      isLoading: false,
      isEditing: false,
      isModalOpened: false,
      breeds: [],
      errorMessage: null,
      updateProfileValidationSchema,
    };
  },
  computed: {
    ...mapGetters(["profile"]),
    location() {
      return splitByComma(this.profile.location);
    },
  },
  async mounted() {
    this.isLoading = true;

    await this.fetchBreeds();

    this.isLoading = false;
  },
  methods: {
    ...mapMutations(["setProfile"]),
    setEditingProfile(state) {
      this.isEditing = state;
    },
    setModalOpened(state) {
      this.isModalOpened = state;
    },
    capitalize(value) {
      return capitalizeFirstLetter(value);
    },
    async fetchBreeds() {
      try {
        const { breeds, error } = await getBreeds();

        if (!error) {
          this.breeds = breeds ?? [];
        }

        this.isLoading = false;
        this.errorMessage = error?.message;

        this.resetErrorMessage();
      } catch (error) {
        this.isLoading = false;
        this.errorMessage = error?.message;

        this.resetErrorMessage();
      }
    },
    async handleProfileUpdate(payload) {
      this.isLoading = true;

      try {
        const { profile, error } = await updateProfile(payload);

        if (!error) {
          this.isLoading = false;
          this.isEditing = false;
          this.setProfile(profile);
        }

        this.isLoading = false;
        this.errorMessage = error?.message;

        this.resetErrorMessage();
      } catch (error) {
        this.isLoading = false;
        this.errorMessage = error?.message;

        this.resetErrorMessage();
      }
    },
    resetErrorMessage() {
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
    },
  },
};
</script>
