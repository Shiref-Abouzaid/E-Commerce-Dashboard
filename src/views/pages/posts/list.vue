<template>
  <div>
    <h1>Posts</h1>

    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post._id">
          <td scope="row">{{ post.postTitle }}</td>
          <td>{{ post.postDescription }}</td>
          <td><span class="text-warning ">{{ post.postStatus }}</span></td>
          <td class="action">
            <div>
              <button
                class="btn btn-success text-light btn-sm"
                @click="showAcceptModal(post._id)"
              >
                Accept
              </button>
              <button
                class="btn btn-danger text-light btn-sm m-2 mt-0 mb-0"
                @click="showRejectModal(post._id)"
              >
                Decline
              </button>
              <button
                class="btn btn-info text-light btn-sm"
                @click="setDetails(post)"
              >
                Details
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <CModal
      alignment="center"
      :visible="acceptModal"
      @close="
        () => {
          acceptModal = false;
        }
      "
    >
      <CModalHeader>
        <CModalTitle>Accept the post</CModalTitle>
      </CModalHeader>
      <CModalBody>Are you sure you want to accept the post?</CModalBody>
      <CModalFooter>
        <CButton
          color="success"
          :disabled="isLoading"
          class="text-light"
          @click="acceptPost"
        >
          <span v-if="!isLoading">Accept</span>
          <CSpinner v-else color="white"></CSpinner>
        </CButton>
        <CButton
          color="danger"
          class="text-light"
          @click="
            () => {
              acceptModal = false;
            }
          "
        >
          No
        </CButton>
      </CModalFooter>
    </CModal>

    <CModal
      alignment="center"
      :visible="rejectModal"
      @close="
        () => {
          rejectModal = false;
        }
      "
    >
      <CModalHeader>
        <CModalTitle>Decline the post</CModalTitle>
      </CModalHeader>
      <CModalBody>Are you sure you want to decline the post?</CModalBody>
      <CModalFooter>
        <CButton
          color="success"
          :disabled="isLoading"
          class="text-light"
          @click="rejectPost"
        >
          <span v-if="!isLoading">Reject</span>
          <CSpinner v-else color="white"></CSpinner>
        </CButton>
        <CButton
          color="danger"
          class="text-light"
          @click="
            () => {
              rejectModal = false;
            }
          "
        >
          No
        </CButton>
      </CModalFooter>
    </CModal>

    <CModal
      alignment="center"
      :visible="detailsModal"
      @close="
        () => {
          detailsModal = false;
        }
      "
    >
      <CModalHeader>
        <CModalTitle>Post Details</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard>
          <CCardImage
            orientation="top"
            :src="`http://localhost:3000/${post.postImageUrl[0]}`"
          />
          <CCardBody>
            <CCardTitle>{{ post.postTitle }}</CCardTitle>
            <CCardText>{{ post.postDescription }}</CCardText>
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="info"
          class="text-light"
          @click="
            () => {
              detailsModal = false;
            }
          "
        >
          Ok
        </CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      acceptModal: false,
      rejectModal: false,
      detailsModal: false,
      posts: [],
      idOfSelectedPost: null,
      isLoading: false,
      post: null,
    };
  },
  methods: {
    setDetails(post) {
      this.detailsModal = true;
      this.post = post;
    },
    rejectPost() {
      this.isLoading = true;
      axios.put(`/declinePost/${this.idOfSelectedPost}`).then((res) => {
        this.rejectModal = false;
        this.getPosts();
      });
      this.isLoading = false;
    },
    acceptPost() {
      this.isLoading = true;
      axios.put(`/approvePost/${this.idOfSelectedPost}`).then((res) => {
        this.acceptModal = false;
        this.getPosts();
      });
      this.isLoading = false;
    },
    showAcceptModal(id) {
      this.idOfSelectedPost = id;
      this.acceptModal = true;
    },
    showRejectModal(id) {
      this.idOfSelectedPost = id;
      this.rejectModal = true;
    },
    getPosts() {
      axios.get("/getAllPendingPosts").then((res) => {
        this.posts = res.data.allPendingPosts;
      });
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>
<style lang="scss" scoped>
.action {
  width: 16rem;
}
.table {
  background-color:#FFF;
}
</style>
