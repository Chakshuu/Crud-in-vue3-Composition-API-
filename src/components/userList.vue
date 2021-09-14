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
          <tr class="active-row" v-for="(user, index) in users" :key="index">
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
                  {name: 'edit-user', params: { id: user.id }}" class="edit-link">
                  Edit
                </router-link>
                </button>
                <button
                  @click.prevent="deleteUser(index)"
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
        <button class="c-button c-button--add">
          <router-link to="/users/new" class="add-link">Add User</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import {mapState} from 'vuex'
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {

  setup() {
    const router = useRouter();
    // const users = ref([]);
    const store = useStore();
    // const route = useRoute();
    // onMounted(() => {
    //   users.value = this.$store.state.USER_STORE.users;
    // });
    const users = computed(() => store.state.USER_STORE.users);
    const addUser = () => {
      router.push({ name: 'add-user' });
    };
    const deleteUser = (index) => {
      users.value.splice(index, 1);
    };
    // const openEdit = (user) => {
    //   // route.params = user;
    //   router.push({
    //     name: 'edit-user',/userse/:id/edit
    //     params: { id: user.id, updateUser: user },
    //     // something
    //   });
    // };

    return {
      addUser,
      deleteUser,
      users,
      // openEdit,
    };
  },
  //   components: {},

  //   data() {
  //     return {
  //       users: null,
  //     };
  //   },

  //   methods: {
  //     openAdd(val) {
  //       this.mode = val;
  //     },
  //     addUser() {
  //       this.$router.push({ name: 'add-user' });
  //     },
  //     /// list refresh
  //     // getter
  //     deleteUser(index) {
  //       this.users.splice(index, 1);
  //     },
  //     openEdit(user) {
  //       this.$router.push({
  //         name: 'edit-user',
  //         params: { updateId: user.id, updateUser: user },
  //       });
  //     },
  //   },
  //   created() {
  //     // ...mapState(['users'])
  //     this.users = this.$store.state.USER_STORE.users;
  //   },
  // mounted() {
  //   const { user } = this.$route.params;
  //   if (user) {
  //     this.addUser(user);
  //   }

  //   const { updatedUser } = this.$route.params;
  //   if (updatedUser) {
  //     this.updateUser(updatedUser);
  //   }
  // },
};
</script>

<style>
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
    padding: 2px 4px;
    margin: 5px 10px;
  }
  .c-button--edit {
    color: white;
    background-color: rgb(35, 101, 224);
  }
  .c-button--delete {
    color: white;
    background-color: red;
  }
  .c-button--add {
    padding: 8px;
    margin-top: 20px;
  }
  .table_layout {
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    text-align: center;
  }

  .table_layout tbody tr:nth-of-type(even) {
    background-color: #ebe7e7;
  }

  .table_layout th,
  .table_layout td {
    padding: 12px 15px;
  }
  .table_layout tbody tr {
    border-bottom: 1px solid #dddddd;
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
