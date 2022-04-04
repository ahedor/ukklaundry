var base_url = "http://localhost:8000/api";
var router = [
  { path: "/", name: "Home", component: httpVueLoader("./src/components/home.vue")},
  { path: "/member", name: "Member", component: httpVueLoader("./src/components/Member.vue")},
  { path: "/outlet", name: "Outlet", component: httpVueLoader("./src/components/Outlet.vue")},
  { path: "/paket", name: "Paket", component: httpVueLoader("./src/components/Paket.vue")},
  { path: "/user", name: "User", component: httpVueLoader("./src/components/User.vue")},
  { path: "/transaksi", name: "Transaksi", component: httpVueLoader("./src/components/Transaksi.vue")},
  { path: "/tambahtransaksi", name: "TambahTransaksi", component: httpVueLoader("./src/components/TambahTransaksi.vue")},
];
var routers = new VueRouter({ routes : router, base: '/'});

var app = new Vue({
  el: "#app",
  components: {
    'login': httpVueLoader("./src/components/Login.vue"),
    'apps' : httpVueLoader("./src/components/App.vue"),
  },
  data: {
    user : {
      id_user: "",
      id_outlet: "",
      role: "",
      name: "",
      username: "",
    },
    componentName: ""
  },
  router: routers,
  methods: {
    CekToken : function(){ 
      if(this.$cookies.isKey('Authorization')){

        let config = {
          headers : {
            "Authorization" : "Bearer " + this.$cookies.get('Authorization')
          }
        }
        
        axios.get(base_url + '/login/check', config)
        .then(response => {
          if(response.data.success == true){
            this.componentName = "apps";

            this.id_user=response.data.data.id;
            this.id_outlet = response.data.data.id_outlet;
            this.role = response.data.data.role;
            this.name = response.data.data.nama;
            this.username = response.data.data.username;
          } else {
            this.componentName = "login";
          }
        })

      }else {
        this.componentName = "login";                                                                                                                                   
      }
    },
  },
  mounted(){
  this.CekToken();
  }
});