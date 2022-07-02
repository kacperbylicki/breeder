<template>
  <Loading v-if="isLoading" />
  <ValidatedForm
    v-slot="{ errors }"
    :validation-schema="createProfileValidationSchema"
    @submit="handleProfileSetup"
  >
    <section class="grid place-items-center mt-10">
      <label for="avatar" class="w-24 btn btn-lg btn-ghost btn-circle avatar rounded-full">
        <div class="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="../assets/default-avatar.svg" alt="avatar" />
        </div>
      </label>
      <Field id="avatar" name="avatar" type="file" class="hidden" />
      <label class="label mt-12">
        <ErrorMessage as="span" name="avatar" class="label-text-alt text-error" />
      </label>
    </section>

    <Field
      name="name"
      type="text"
      placeholder="Name"
      class="input input-bordered w-full mt-4"
      :class="{ 'input-primary': !errors.name, 'input-error': errors.name }"
    />
    <label class="label">
      <ErrorMessage as="span" name="name" class="label-text-alt text-error" />
    </label>

    <Field
      name="dateOfBirth"
      placeholder="Date of birth"
      class="input input-bordered w-full mt-4"
      :class="{ 'input-primary': !errors.name, 'input-error': errors.name }"
      @focus="(e) => (e.target.type = 'date')"
      @blur="(e) => (e.target.type = 'text')"
    />
    <label class="label">
      <ErrorMessage as="span" name="dateOfBirth" class="label-text-alt text-error" />
    </label>

    <Field
      name="breed"
      as="select"
      class="select w-full mt-4"
      :class="{ 'input-primary': !errors.breed, 'input-error': errors.breed }"
    >
      <option value="" disabled selected>Choose a breed</option>
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
      class="select w-full mt-4"
      :class="{ 'input-primary': !errors.gender, 'input-error': errors.gender }"
    >
      <option value="" disabled selected>Choose a gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </Field>
    <label class="label">
      <ErrorMessage as="span" name="gender" class="label-text-alt text-error" />
    </label>

    <Field
      name="location"
      type="text"
      placeholder="City, Country"
      class="input input-bordered w-full mt-4"
      :class="{ 'input-primary': !errors.location, 'input-error': errors.location }"
    />
    <label class="label">
      <ErrorMessage as="span" name="location" class="label-text-alt text-error" />
    </label>

    <button class="btn btn-primary btn-wide mt-4 w-80">Save</button>
  </ValidatedForm>
</template>
<script>
import Loading from "../components/Loading.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { createProfile, getBreeds } from "../services";
import { createProfileValidationSchema } from "../validators/profile.validator";
import { mapMutations } from "vuex";

export default {
  components: {
    ValidatedForm: Form,
    Field,
    ErrorMessage,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      breeds: [],
      errorMessage: null,
      createProfileValidationSchema,
    };
  },
  async mounted() {
    this.isLoading = true;

    await this.fetchBreeds();

    this.isLoading = false;
  },
  methods: {
    ...mapMutations(["setProfile"]),
    async fetchBreeds() {
      try {
        const { breeds, error } = await getBreeds();

        if (!error) {
          this.breeds = breeds ?? [];
        }

        this.isLoading = false;
        this.errorMessage = error?.response?.data?.message;
      } catch (error) {
        this.isLoading = false;
        this.errorMessage = error?.response?.data?.message;
      }
    },
    async handleProfileSetup(payload) {
      this.isLoading = true;

      try {
        const { profile, error } = await createProfile(payload);

        if (!error) {
          this.isLoading = false;
          this.isEditing = false;
          this.setProfile(profile);

          await this.$router.push("/");
        }

        this.isLoading = false;
        this.errorMessage = error?.response?.data?.message;
      } catch (error) {
        this.isLoading = false;
        this.errorMessage = error?.response?.data?.message;
      }
    },
  },
};
</script>
