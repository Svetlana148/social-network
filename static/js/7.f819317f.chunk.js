(this.webpackJsonpreact_4_lesson=this.webpackJsonpreact_4_lesson||[]).push([[7],{193:function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"a",(function(){return a}));r(0);const n=e=>{if(!e)return"Field is required"},a=e=>t=>{if(t&&t.length>e)return"Max length is ".concat(e," symbols")}},194:function(e,t,r){e.exports={formControl:"FormsControls_formControl__1sLW_",error:"FormsControls_error__Mmyin",formSummaryError:"FormsControls_formSummaryError__3xloe"}},195:function(e,t,r){"use strict";r.d(t,"b",(function(){return m})),r.d(t,"a",(function(){return i})),r.d(t,"c",(function(){return s}));var n=r(0),a=r.n(n),o=r(194),l=r.n(o),c=r(85);const m=e=>{let{input:t,meta:r,...n}=e,o=r.touched&&r.error;return a.a.createElement("div",{className:l.a.formControl+" "+(o?l.a.error:" ")},a.a.createElement("div",null,a.a.createElement("textarea",Object.assign({},t,n))),o&&a.a.createElement("span",null,r.error))},i=e=>{let{input:t,meta:r,...n}=e,o=r.touched&&r.error;return a.a.createElement("div",{className:l.a.formControl+" "+(o?l.a.error:" ")},a.a.createElement("div",null,a.a.createElement(n.typeElement,Object.assign({},t,n))),o&&a.a.createElement("span",null,r.error))},s=function(e,t,r,n,o){let l=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{},m=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"";return a.a.createElement("div",null,a.a.createElement(c.a,Object.assign({placeholder:e,name:t,validate:r,component:n,typeElement:o},l)),m)}},276:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),o=r(86),l=r(195),c=r(193),m=r(18),i=r(17),s=r(4),u=r(194),d=r.n(u);const b=Object(o.a)({form:"login"})(e=>{let{handleSubmit:t,error:r}=e;return a.a.createElement("form",{onSubmit:t},Object(l.c)("Email","email",[c.b],l.a,"input"),Object(l.c)("Password","password",[c.b],l.a,"input",{type:"password"}),Object(l.c)(null,"rememberMe",[],l.a,"input",{type:"checkbox"},"remember me"),r&&a.a.createElement("div",{className:d.a.formSummaryError},r),a.a.createElement("div",null,a.a.createElement("button",null,"Login")))});t.default=Object(m.b)(e=>({isAuth:e.auth.isAuth}),{login:i.c})(e=>e.isAuth?a.a.createElement(s.a,{to:"/Profile"}):a.a.createElement("div",null,a.a.createElement("h1",null,"Login "),a.a.createElement(b,{onSubmit:t=>{e.login(t.email,t.password,t.rememberMe)}})))}}]);
//# sourceMappingURL=7.f819317f.chunk.js.map