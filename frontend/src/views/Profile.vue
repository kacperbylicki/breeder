<template>
  <Loading v-if="isLoading" />
  <ErrorAlert v-if="errorMessage" :error-message="errorMessage" />
  <div class="card w-auto mt-8 bg-base-100 shadow-xl mx-3">
    <section v-if="!isEditing" class="grid place-items-end p-4">
      <button class="btn btn-sm" @click="setEditingProfile(true)">Edit</button>
    </section>

    <section class="grid place-items-center mt-6">
      <div class="avatar">
        <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img v-if="profile.avatar" :src="profile.avatar.url" alt="avatar" />
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
            class="input input-bordered w-full mt-10"
            :class="{ 'input-primary': !errors.name, 'input-error': errors.name }"
            :value="profile.name"
          />
          <label class="label">
            <ErrorMessage as="span" name="name" class="label-text-alt text-error" />
          </label>

          <Field
            name="breed"
            as="select"
            class="select w-full mt-6"
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
            class="select w-full mt-6"
            :class="{ 'input-primary': !errors.gender, 'input-error': errors.gender }"
            :value="profile.gender"
          >
            <option :value="profile.gender">{{ capitalize(profile.gender) }}</option>
            <option v-if="profile.gender === 'female'" value="male">Male</option>
            <option v-else value="female">Female</option>
          </Field>
          <label class="label">
            <ErrorMessage as="span" name="gender" class="label-text-alt text-error" />
          </label>

          <Field
            name="location"
            type="text"
            placeholder="City, Country"
            class="input input-bordered w-full mt-6"
            :class="{ 'input-primary': !errors.location, 'input-error': errors.location }"
            :value="profile.location"
          />
          <label class="label">
            <ErrorMessage as="span" name="location" class="label-text-alt text-error" />
          </label>
        </section>
        <section class="flex justify-end">
          <button
            class="btn btn-sm btn-link text-neutral mt-8 mr-2"
            @click="setEditingProfile(false)"
          >
            Cancel
          </button>
          <button class="btn btn-sm mt-8" @click="handleProfileUpdate(values)">Save</button>
        </section>
      </ValidatedForm>

      <section v-else>
        <div class="text-left">
          <div class="text-xl font-extrabold">
            {{ capitalize(profile.name) }}
            <span class="ml-2 text-primary">{{ profile.age }}</span>
          </div>

          <section class="space-x-2">
            <div class="badge badge-lg mt-4 gap-2">
              Breed <span class="font-extrabold">{{ profile.breed }}</span>
            </div>

            <div class="badge badge-lg mt-4 gap-2">
              Gender
              <span class="font-extrabold">{{ capitalize(profile.gender) }}</span>
            </div>

            <div class="badge badge-lg mt-4 gap-2">
              <span class="font-extrabold">{{ location[0] }}</span>
              {{ location[1] }}
            </div>
          </section>
        </div>
      </section>
    </section>
  </div>
</template>
<script>
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
  },
  data() {
    return {
      isLoading: false,
      isEditing: false,
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
