import Modal from '../containers/ModalGlobal.vue'

export default {
  
  install: function (Vue, options) {
    // 1. adicionar método ou propriedade global
    //Vue.myGlobalMethod = function () {
      // alguma lógica ...
      //alert("Message global")
    //}

    // 2. adicionar um recurso global
    // Vue.directive('my-directive', {
    //   bind (el, binding, vnode, oldVnode) {
    //     // alguma lógica ...
    //   }
    //   ...
    // })

    // 3. adicionar algumas opções de componente
    // Vue.mixin({
    //   created: function () {
    //     // alguma lógica ...
    //   }
    //   ...
    // })

    const AlertConstructor = Vue.extend( Modal )
    const instance = new AlertConstructor()
    instance.$mount(document.createElement('div'))
    // 4. adicionar um método de instância
    Vue.prototype.$message = function (msg, type='info', timeout=3) {
      // alguma lógica ...
        document.body.appendChild(instance.$el)
        // alert logic
        instance.type = type
        instance.msg = `<div class="card">
          <div class="card-body">
            ${msg}
          </div>
        </div>`
        instance.isShow = true
        instance.persistent = true
        instance.instance = instance

        setTimeout(() => instance.isShow = false, timeout * 1000)
    }
     
    Vue.prototype.$modal = (msg) => {
        document.body.appendChild(instance.$el)
        // alert logic
        instance.type = 'alert'
        instance.msg = msg
        instance.isShow = true
        instance.instance = instance
    }

  }
}