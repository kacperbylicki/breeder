<template>
  <ErrorAlert v-if="errorMessage" :error-message="errorMessage" />
  <ValidatedForm
    v-slot="{ errors }"
    :validation-schema="registerValidationSchema"
    @submit="handleRegister"
  >
    <Field
      name="email"
      type="text"
      placeholder="Email"
      class="input input-bordered w-full max-w-xs mt-10"
      :class="{ 'input-primary': !errors.email, 'input-error': errors.email }"
    />
    <label class="label">
      <ErrorMessage as="span" name="email" class="label-text-alt text-error" />
    </label>

    <Field
      name="password"
      type="password"
      placeholder="Password"
      class="input input-bordered w-full max-w-xs mt-4"
      :class="{ 'input-primary': !errors.password, 'input-error': errors.password }"
    />
    <label class="label">
      <ErrorMessage as="span" name="password" class="label-text-alt text-error" />
    </label>

    <Field
      name="confirmPassword"
      type="password"
      placeholder="Confirm Password"
      class="input input-bordered w-full max-w-xs mt-4"
      :class="{ 'input-primary': !errors.confirmPassword, 'input-error': errors.confirmPassword }"
    />
    <label class="label">
      <ErrorMessage as="span" name="confirmPassword" class="label-text-alt text-error" />
    </label>

    <p class="text-xs">
      Already registered?
      <a class="link link-hover ml-1" @click="redirectToLogin">Login</a>
    </p>

    <button v-if="isLoading" class="btn btn-primary btn-wide mt-4 w-80 loading"></button>
    <button v-else class="btn btn-primary btn-wide mt-4 w-80">Register</button>
  </ValidatedForm>
</template>
<script>
import ErrorAlert from "../components/ErrorAlert.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { registerAccount } from "../services";
import { registerValidationSchema } from "../validators/register.validator";

export default {
  components: {
    ErrorAlert,
    ValidatedForm: Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      isLoading: false,
      errorMessage: null,
      registerValidationSchema,
    };
  },
  methods: {
    async handleRegister(payload) {
      this.isLoading = true;

      try {
        const { error } = await registerAccount(payload);

        if (!error) {
          this.isLoading = false;
          await this.$router.push("/login");
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
    redirectToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
