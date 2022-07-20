<template>
  <ErrorAlert v-if="errorMessage" class="mx-auto w-80 mt-12" :error-message="errorMessage" />
  <ValidatedForm
    v-slot="{ errors }"
    :validation-schema="loginValidationSchema"
    @submit="handleLogin"
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

    <p class="text-xs">
      No account yet?
      <a class="link link-hover ml-1" @click="redirectToRegister">Register</a>
    </p>

    <button v-if="isLoading" class="btn btn-primary btn-wide mt-4 w-80 loading"></button>
    <button v-else class="btn btn-primary btn-wide mt-4 w-80">Login</button>
  </ValidatedForm>
</template>

<script>
import ErrorAlert from "../components/ErrorAlert.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { loginValidationSchema } from "../validators/login.validator";
import { mapActions } from "vuex";

export default {
  components: {
    ValidatedForm: Form,
    Field,
    ErrorMessage,
    ErrorAlert,
  },
  data() {
    return {
      isLoading: false,
      errorMessage: null,
      loginValidationSchema,
    };
  },
  methods: {
    ...mapActions(["login"]),
    async handleLogin(payload) {
      this.isLoading = true;

      try {
        const { error } = await this.login(payload);

        this.isLoading = false;

        if (!error) {
          await this.$router.push("/");
        }

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
    redirectToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
