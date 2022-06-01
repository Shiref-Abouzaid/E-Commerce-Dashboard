<template>
  <div>
    <h1>create user</h1>
    <CForm @submit.prevent="createUser">
      <CRow>
        <CCol :sm="6">
          <CInputGroup class="mb-3">
            <CInputGroupText class="input-text">Email</CInputGroupText>
            <CFormInput reqired placeholder="Email" v-model="userData.email" autocomplete="Email" />
          </CInputGroup>

        </CCol>
        <CCol :sm="6">
          <CInputGroup class="mb-3">
            <CInputGroupText class="input-text">Password</CInputGroupText>
            <CFormInput text="Must include capital character,special character and number." placeholder="Password" v-model="userData.password" type="password" />
          </CInputGroup>
        </CCol>
        <CCol :sm="6">
          <CInputGroup class="mb-4">
            <CInputGroupText class="input-text">User Name</CInputGroupText>
            <CFormInput placeholder="User Name" v-model="userData.userName" type="text" />
          </CInputGroup>
        </CCol>
        <CCol :sm="6">
          <CInputGroup class="mb-3">
            <CInputGroupText class="input-text">Age</CInputGroupText>
            <CFormInput placeholder="Age" v-model="userData.age" type="text" />
          </CInputGroup>
        </CCol>
        <CCol :sm="6">
          <CInputGroup class="mb-3">
            <CInputGroupText class="input-text">National ID</CInputGroupText>
            <CFormInput placeholder="National ID" v-model="userData.nationalID" type="text" />
          </CInputGroup>
        </CCol>
        <CCol :sm="6">
          <CInputGroup class="mb-3">
            <CInputGroupText class="input-text">Role</CInputGroupText>
            <CFormSelect v-model="userData.role" aria-label="Select Role" :options="[
              'Select Role',
              { label: 'Admin', value: 'admin' },
              { label: 'User', value: 'user' },
            
            ]">
            </CFormSelect>

          </CInputGroup>
        </CCol>
        <Col :sm="12">
        <div class="d-flex">
          <button :disabled="isLoading" class="btn btn-success text-light submit-btn">
            <span v-if="!isLoading">Submit</span>
            <CSpinner v-else color="white"></CSpinner>
          </button>
        </div>

        </Col>
      </CRow>
    </CForm>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateUser',

  data() {
    return {
      isLoading: false,
      userData: {
        "email": "",
        "password": "abcdefgH!5",
        "userName": "",
        "age": '',
        "nationalID": 91825643670115,
        "role": ""
      }
    }
  },

  methods:{
    createUser() {

      this.isLoading = true;
      axios.post('/adminSignUp', this.userData).then(()=>{

        this.userData = {
        "email": "",
        "password": "abcdefgH!5",
        "userName": "",
        "age": '',
        "nationalID": 91825643670115,
        "role": ""
      }
      })
      this.isLoading = false;
    }
  }
}
</script>
<style scoped>
.input-text {
  width: 7rem
}

.submit-btn {
  margin-left: auto
}
</style>