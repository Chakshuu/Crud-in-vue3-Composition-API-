<template>
  <div class="add-user">
    <h2 class="header">Add a new User</h2>
    <form class="add-form">
      <label class="add-form  add-form__label">First Name:</label>
      <input class="add-form  add-form__input" v-model="newUser.fname" type="text" required />
      <label class="add-form  add-form__label">Last Name:</label>
      <input class="add-form  add-form__input" v-model="newUser.lname" type="text" required />
      <label class="add-form  add-form__label">Age</label>
      <input class="add-form  add-form__input" v-model="newUser.age" type="number" required />
      <label class="add-form  add-form__label">Gender</label>
      <select class="add-form  add-form__select" v-model="newUser.gender">
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
      if (newUser.fname !== '' && newUser.lname !== '' && newUser.age !== '' && newUser.gender !== '') {
        return false;
      }

      return true;
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

<style scoped>
  .add-user {
    margin: 1rem auto;
    max-width: 35rem;
  }
  .header {
    text-align: center;
  }
  .add-form__label {
    display: block;
    margin: .8rem 0 1.5rem;
  }
  .add-form__input {
    display: block;
    width: 100%;
    padding: .5rem;
    box-sizing: border-box;
  }
  .add-form__select {
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
