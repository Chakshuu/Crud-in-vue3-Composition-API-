<template>
  <div class="add-user">
    <h2 class="header">Add a new User</h2>
    <form>
      <label>First Name:</label>
      <input v-model="newUser.fname" type="text" required />
      <label>Last Name:</label>
      <input v-model="newUser.lname" type="text" required />
      <label>Age</label>
      <input v-model="newUser.age" type="number" required />
      <label>Gender</label>
      <select v-model="newUser.gender">
        <option>Male</option>
        <option>Female</option>
        <option>Others</option>
      </select>
    </form>

    <div class="button_property">
      <vueButton :disabled="isDisabled()" @click="storeUser" btnText="ADD"  />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import UserService from '../UserService';
import vueButton from '../shared/vueButton.vue';

export default {
  components: {
    vueButton,
  },
  setup() {
    const router = useRouter();
    const newUser = reactive({
      fname: ' ',
      lname: ' ',
      age: '',
      gender: '',
    });

    const isDisabled = () => {
      console.log('Disabled function called');
    };
    const storeUser = async () => {
      await UserService.insertUser(newUser.fname, newUser.lname, newUser.age, newUser.gender);
      router.push({ name: 'user-list' });
    };
    return {
      newUser,
      storeUser,
      isDisabled,
    };
  },
};
</script>

<style>
  .add-user * {
    box-sizing: border-box;
  }

  .add-user {
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
