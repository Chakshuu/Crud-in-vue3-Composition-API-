<template>
  <div class="edit-user">
    <h2 class="header">Edit the User</h2>
    <form class="edit-form">
      <label class="edit-form  edit-form__label">First Name:</label>
      <input
        class="edit-form__input"
        placeholder="localstore.user.fname"
        v-model="localstore.user.fname"
        type="text"
        required/>
      <label class="edit-form__label">Last Name:</label>
      <input
        class="edit-form__input"
        placeholder="localstore.user.lname"
        v-model="localstore.user.lname"
        type="text"
        required/>
      <label class="edit-form__label">Age</label>
      <input
        class="edit-form__input"
        placeholder="localstore.user.age"
        v-model="localstore.user.age"
        type="number"
        required />
      <label class="edit-form__label">Gender</label>
      <select class="edit-form__select" v-model="localstore.user.gender">
        <option>Male</option>
        <option>Female</option>
        <option>Others</option>
      </select>
    </form>

    <div class="edit-form__submit">
      <vueButton :disabled="isDisabled()" @click="updateUser" btnText="SUBMIT" />
    </div>
  </div>
</template>

<script>

import { onBeforeMount, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import UserService from '../UserService';
import vueButton from '../shared/vueButton.vue';

export default {
  components: {
    vueButton,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const localstore = reactive({
      id: '',
      user: {},
    });
    onBeforeMount(async () => {
      localstore.id = route.params.id;
      const res = await UserService.fetchUser(localstore.id);
      localstore.user = res.data;
    });
    const isDisabled = () => {
      if (localstore.user.fname !== '' && localstore.user.lname !== '' && localstore.user.age !== '' && localstore.user.gender !== '') {
        return false;
      }

      return true;
    };
    const updateUser = async () => {
      await UserService.updateUser(localstore.id, localstore.user);
      router.push({ name: 'user-list' });
    };
    return {
      localstore,
      isDisabled,
      updateUser,
    };
  },
};
</script>

<style scoped>
  .edit-user {
    margin: 1rem auto;
    max-width: 35rem;
  }
  .header {
    text-align: center;
  }
  .edit-form__label {
    display: block;
    margin: .8rem 0 1.5rem;
  }
  .edit-form__input {
    display: block;
    width: 100%;
    padding: .5rem;
    box-sizing: border-box
  }
  .edit-form__select {
    display: block;
    width: 100%;
    padding: .5rem;
  }
  .edit-form__submit {
    text-align: center;
    margin-top: 2rem;
  }
</style>
