<template>
  <div class="edit-user">
    <h2 class="header">Edit the User</h2>
    <form>
      <label>First Name:</label>
      <input
        class="userInput"
        placeholder="localstore.user.fname"
        v-model="localstore.user.fname"
        type="text"
        required/>
      <label>Last Name:</label>
      <input
        class="userInput"
        placeholder="localstore.user.lname"
        v-model="localstore.user.lname"
        type="text"
        required/>
      <label>Age</label>
      <input
        class="userInput"
        placeholder="localstore.user.age"
        v-model="localstore.user.age"
        type="number"
        required />
      <label>Gender</label>
      <select class="userInput  userInput--select" v-model="localstore.user.gender">
        <option>Male</option>
        <option>Female</option>
        <option>Others</option>
      </select>
    </form>

    <div class="button_property">
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
  .edit-user * {
    box-sizing: border-box;
  }
  .edit-user {
    margin: 1rem auto;
    max-width: 35rem;
  }
  .header {
    text-align: center;
  }
  label {
    display: block;
    margin: .8rem 0 1.5rem;
  }
  .userInput {
    display: block;
    width: 100%;
    padding: .5rem;
  }
  .userInput--select {
    display: block;
    width: 100%;
    padding: .5rem;
  }
  h3 {
    margin-top: 1rem;
  }
  .button_property {
    text-align: center;
    margin-top: 2rem;
  }
</style>
