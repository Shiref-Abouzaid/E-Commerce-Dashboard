<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="login">
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      v-model="userData.email"
                      autocomplete="Email"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      v-model="userData.password"
                      placeholder="Password"
                      autocomplete="current-password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      
                      <CButton color="primary"  type="submit" class="px-4">
                        <span v-if="!isLoading">Login</span>
                        <CSpinner v-else color="white" ></CSpinner>
                        
                      </CButton>
                    </CCol>
                    <CAlert v-if="showErrorMessage" class="m-2 mt-3" color="danger">Email or Password is wrong!</CAlert>
                    <!-- <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol> -->
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <!-- <CButton color="light" variant="outline" class="mt-3">
                    Register Now!
                  </CButton> -->
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data() {
    return {
      userData: {
        email: null,
        password: null,
      },
      isLoading: false,
      showErrorMessage:false,
    }
  },
  methods: {
    login() {
      this.isLoading = true;
      this.showErrorMessage = false;
      axios
        .post('http://localhost:3000/logIn', this.userData)
        .then((res) => {
          this.isLoading = false;
          localStorage.setItem('token',res.data.token)
          this.$store.dispatch('login', res.data.token)
          this.$router.push('/posts/list')
        })
        .catch(() => {
          this.isLoading = false;
          this.showErrorMessage = true;

        })
    },
  },
}
</script>
