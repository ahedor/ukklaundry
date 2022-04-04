<template>
<div>

<div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="row w-100 m-0">
        <div class="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
          <div class="card col-lg-4 mx-auto">
            <div class="card-body px-5 py-5">
              <div class="navbar-brand brand-logo">
              <h3 class="card-title text-center mb-3">L A U N D R Y</h3>
              </div>
              <h6 class="font-weight-light">Log In To Manage Your Laundry</h6>
              <form role="form" v-on:submit.prevent="login" class="pt-3" >
                <b-alert :variant="type" :show="show">
                    <b-spinner v-if="spin" label="Spinning" variant="success" small></b-spinner>
                        {{ message }}
                </b-alert>
                <!-- <div class="alert alert-success" role="alert">
                      <strong>{{ message }}</strong>
                </div> -->
                <div class="form-group">
                <div class="input-group">
                <div class="input-group-prepend bg-transparent">
                    <span class="input-group-text bg-transparent border-right-0">
                        <i class="mdi mdi-account-outline text-primary"></i>
                    </span>
                </div>
                 <input v-model="username"  class="form-control text-light border-left-0" id="username"  type="username" placeholder="Username" required>
                </div>
                </div>
                <div class="form-group">
                <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                            <i class="mdi mdi-lock-outline text-primary"></i>
                        </span>
                    </div>
                  <input v-model="password" class="form-control text-light border-left-0" id="password" type="password" placeholder="Password" />
                </div>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary btn-block enter-btn">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- row ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</div>
</template>

<script>
module.exports = {
    data: function(){
        return {
            username: "",
            password: "",
            message: "login",
            type:"secondary",
            show: false,
            spin: false
            
        }
    },
    methods: {
        login: function(){
          this.show = true;
          this.spin = true;
            this.message = "Logging In";
            let form = {
                "username": this.username,
                "password": this.password
            }

            axios.post(base_url + '/login', form) 
            .then(response =>{
              this.spin = false;
              let logged = response.data.success;
                if(logged){
                    if(this.$cookies.isKey('Authorization')){
                        this.$cookies.remove('Authorization');
                    }
                    this.$cookies.set('Authorization', response.data.data.token);
                    this.type = "success";
                    this.message = response.data.message;
                    location.reload();
                } else {
                  this.type = "danger";
                    this.message = response.data.message;
                }

            })
            console.log(response);
        },

    }
    
}
</script>