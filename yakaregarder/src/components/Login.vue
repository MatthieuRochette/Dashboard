<template>
    <div>
        <div class="bloc-login" v-if="reveal">
        <div v-if="!displayRegister">

            <div class="overlay"></div>

                <div class="login card">
                    <h2>Login</h2>
                    <form>
                        <div class="form-group">

                            <label for="emailLogin">Email</label>
                            <input v-model="loginData.email" type="text" id="emailLogin" class="form-control">
                            
                            <br>

                            <label for="passwordLogin">Password</label>
                            <input v-on:keyup.enter="loginUser" v-model="loginData.password" type="password" id="passwordLogin" class="form-control">


                            <p class="errorLogin">{{ strErrorLogin }}</p>
                            <div v-on:click="loginUser" class="btn-login btn btn-success">Login</div>
                            <div v-on:click="toggleRegister" class="btn-Toregister btn btn-link">Register</div>
                            <br>
                            <br>
                            <button type="button" v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="bloc-register" v-if="displayRegister">
            <div class="overlay">
                <div class="register card">
                    <div v-on:click="toggleRegister" class="btn-register-return btn btn-danger">x</div>
                    <h2>Register</h2>
                    <form>
                        <div class="form-group">
                            <label for="email">Email*</label>
                            <input v-model="registerData.email" type="text" id="email" class="form-control">

                            <br>

                            <label for="name">Name*</label>
                            <input v-model="registerData.name" type="text" id="name" class="form-control">

                            <br>

                            <label for="city">City</label>
                            <input v-model="registerData.city" type="text" id="city" class="form-control">

                            <br>

                            <label for="password">Password*</label>
                            <input v-model="registerData.password" type="password" id="password" class="form-control">

                            <label for="password-confirm">Confirm your password*</label>
                            <input v-model="registerData.confirmPassword" type="password" id="password-confirm" class="form-control">
                            
                            <div class="btn-register btn btn-success" v-on:click="registerUser">Register</div>
                            <p class="errorstr">{{ strErrorRegister }}</p>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>

import GoogleSignInButton from 'vue-google-signin-button-directive'

export default {
    name: 'Login',
    directives: {
        GoogleSignInButton
    },
    data() {
        return {
            clientId: '354608309293-idnaqt4u5aj80evfgvq5mq087c6rc332.apps.googleusercontent.com',
            registerData: {
                email : '',
                name : '',
                city : '',
                password : '',
                confirmPassword : ''
            },
            displayRegister : false,
            strErrorRegister : '',
            loginData: {
                email : '',
                password : ''
            },
            isLogged: false,
            strErrorLogin :''
        }
    },
    props: ['reveal', 'toggleLogin'],
    components: {
    },
    methods: {
        toggleRegister: function() {
            this.displayRegister = !this.displayRegister
        },
        registerUser: async function() {
             if (this.registerData.email != '' || this.registerData.name != ''
                || this.registerData.password != ''
                || this.registerData.confirmPassword != '') {
                if (this.registerData.password == this.registerData.confirmPassword) {
                    const api_host = process.env.VUE_APP_API_HOST;
                    const res = await fetch(api_host + "/users/sign_in", {
                        method: 'post',
                        body: JSON.stringify(this.registerData),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    });
                    this.displayRegister = false
                    this.resetRegisterData()
                } else {
                    this.strErrorRegister = "Passwords do not match"
                }
            } else {
                this.strErrorRegister = "Empty field(s)"
            }
        },
        resetRegisterData: function() {
            this.registerData.email = ''
            this.registerData.name = ''
            this.registerData.city = ''
            this.registerData.password = ''
            this.registerData.confirmPassword = ''
        },
        loginUser: async function() {
            if (this.loginData.email != '' || this.loginData.password != '') {
                const api_host = process.env.VUE_APP_API_HOST;
                const res = await fetch(api_host + "/users/log_in", {
                    method: 'post',
                    body: JSON.stringify(this.loginData),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
                if (res.status == 202) {
                    this.$emit('toggleLogin', this.loginData)
                }
                else
                    this.strErrorLogin = "Password or email is invalid"
            } else {
                this.strErrorLogin = "Empty field(s)"
            }
        },
        OnGoogleAuthSuccess: async function(idToken) {
            const api_host = process.env.VUE_APP_API_HOST;
            const res = await fetch(api_host + "/users/google_auth", {
                method: 'post',
                body: JSON.stringify({'google_id': idToken}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            if (res.status < 400) {
                const res_json = await res.json()
                this.loginData.email = res_json.email
                this.loginData.name = res_json.name
                this.$emit('toggleLogin',this.loginData)
            }
        },
        OnGoogleAuthFail: function (error) {
            console.log(error)
        }
    }
}
</script>

<style scoped  src='./Login.css'>

</style>