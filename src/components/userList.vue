<template>
  <div>
    <div class="c-user-list">
      <h1 class="c-user-list__header">User List</h1>
      <table class="table_layout">
        <thead>
          <tr>
            <th>SNo.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          <tr class="active-row" v-for="(user, index) in users"
              :key = "user._id"
              :item = "user"
              :index = "index"
             >
            <th>{{ index + 1 }}</th>
            <td>{{ user.fname }}</td>
            <td>{{ user.lname }}</td>
            <td>{{ user.age }}</td>
            <td>{{ user.gender }}</td>
            <td>
              <form>
                <button
                  class="c-button  c-button--edit">
                  <router-link :to="
                  {name: 'edit-user', params: { id: user._id }}" class="edit-link">
                  Edit
                </router-link>
                </button>
                <button
                  @click.prevent="deleteUser(user._id)"
                  class="c-button  c-button--delete"
                >
                  Delete
                </button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="addUser">
         <router-link to="/users/new" class="add-link">
         <vueButton btnText="Add User"/></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import UserService from '../UserService';
import vueButton from '../shared/vueButton.vue';

export default {
  components: {
    vueButton,
  },
  setup() {
    const router = useRouter();
    const users = ref([]);
    const error = ref('');
    const addUser = () => {
      router.push({ name: 'add-user' });
    };

    const getUser = async () => {
      try {
        users.value = await UserService.getUser();
      } catch (err) {
        error.value = err.message;
      }
    };
    onMounted(getUser);

    const deleteUser = async (id) => {
      await UserService.deleteUser(id);
      users.value = await UserService.getUser();
    };

    return {
      addUser,
      deleteUser,
      users,
    };
  },
};
</script>

<style scoped>
  .c-user-list__header {
    text-align: center;
    text-transform: uppercase;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    font-weight: 900;
  }
  .addUser {
    text-align: center;
  }
  .c-button {
    text-align: center;
    padding: .1rem .1rem .2rem;
    margin: 1rem .2rem 1rem .2rem;
  }
  .c-button--edit {
    color: white;
    background-color: rgb(35, 101, 224);
  }
  .c-button--delete {
    color: white;
    background-color: red;
  }
  .table_layout {
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;
    font-size: 1em;
    font-family: sans-serif;
    min-width: 10rem .5rem;
    box-shadow: 0 0 5rem .5rem rgba(0, 0, 0, 0.15);
    text-align: center;
  }

  .table_layout tbody tr:nth-of-type(even) {
    background-color: #ebe7e7;
  }

  .table_layout th,
  .table_layout td {
    padding: .4rem .8rem .2rem;
  }
  .table_layout tbody tr {
    border-bottom: .2rem .3rem solid #dddddd;
  }
  .add-link {
    color: black;
    text-decoration-line: none;
  }
  .edit-link {
      color: white;
      text-decoration-line: none;
  }
</style>
