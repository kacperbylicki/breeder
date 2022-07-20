<template>
  <input type="checkbox" class="modal-toggle" :checked="modelValue" />
  <div class="modal">
    <div class="modal-box relative">
      <label
        class="btn btn-sm btn-circle absolute right-2 top-2"
        @click="$emit('modalOpened', false)"
        >✕</label
      >
      <h3 class="text-lg font-bold">Are you sure you want to delete account?</h3>
      <p class="py-4">
        This action cannot be undone. This will <b>permanently</b> delete your account. Please type
        your password to confirm.
      </p>
      <ValidatedForm
        v-slot="{ errors }"
        :validation-schema="accountDeleteValidationSchema"
        @submit="handleAccountDelete"
      >
        <Field
          name="password"
          type="password"
          placeholder="Password"
          class="input input-bordered input-secondary w-full mt-4"
          :class="{ 'input-error': errors.password }"
        />
        <label class="label">
          <ErrorMessage as="span" name="password" class="label-text-alt text-error" />
        </label>

        <button v-if="isLoading" class="btn btn-secondary btn-wide mt-2 btn-block loading"></button>
        <button v-else class="btn btn-secondary btn-wide mt-2 btn-block">
          I understand consequences, delete this account
        </button>

        <ErrorAlert
          v-if="errorMessage"
          class="max-w-full w-full mt-6"
          :error-message="errorMessage"
        />
      </ValidatedForm>
    </div>
  </div>
</template>

<script>
import ErrorAlert from "./ErrorAlert.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { accountDeleteValidationSchema } from "../validators/account-delete.validator";
import { deleteAccount } from "../services";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "DeleteAccountModal",
  components: {
    ValidatedForm: Form,
    Field,
    ErrorMessage,
    ErrorAlert,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["modalOpened"],
  data() {
    return {
      isLoading: false,
      errorMessage: null,
      accountDeleteValidationSchema,
    };
  },
  computed: {
    ...mapGetters(["profile", "accountId", "email"]),
  },
  methods: {
    ...mapMutations(["clearAccountData"]),
    async handleAccountDelete(payload) {
      this.isLoading = true;

      try {
        const { error } = await deleteAccount({
          ...payload,
          ...this.profile,
          accountId: this.accountId,
          email: this.email,
        });

        if (!error) {
          this.isLoading = false;

          this.clearAccountData();

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
  },
};
</script>
