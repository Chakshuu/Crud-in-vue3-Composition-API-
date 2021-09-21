<template>
  <div id="edit-user">
    <h2 class="header">Edit the User</h2>
    <form>
      <label>First Name:</label>
      <input
        placeholder="localstore.user.fname"
        v-model="localstore.user.fname"
        type="text"
        required/>
      <label>Last Name:</label>
      <input
        placeholder="localstore.user.lname"
        v-model="localstore.user.lname"
        type="text"
        required/>
      <label>Age</label>
      <input
        placeholder="localstore.user.age"
        v-model="localstore.user.age"
        type="number"
        required />
      <label>Gender</label>
      <select  v-model="localstore.user.gender">
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
      console.log('Disabled function called');
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

<style>
  #edit-user * {
    box-sizing: border-box;
  }

  #edit-user {
    margin: 20px auto;
    max-width: 500px;
  }
  label {
    display: block;
    margin: 20px 0 10px;
  }
  input,
  select {
    display: block;
    width: 100%;
    padding: 8px;
  }
  #preview {
    padding: 10px 20px;
    border: 1px dotted black;
    margin: 20px 0;
  }
  h3 {
    margin-top: 10px;
  }
  .button_property {
    text-align: center;
    margin-top: 10px;
  }

  .button {
    text-align: center;
    padding: 10px 40px;
  }
</style>
