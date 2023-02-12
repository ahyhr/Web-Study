(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4513debe"],{"10c0":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"categories"},[a("breadcrumb",{attrs:{titles:["商品管理","商品分类"]}}),a("el-card",{staticClass:"box-card"},[a("el-button",{attrs:{type:"primary"},on:{click:e.addCate}},[e._v("添加分类")]),a("cate-Table",{attrs:{cateList:e.cateList}}),a("el-pagination",{attrs:{background:"","current-page":e.queryInfo.pagenum,"page-sizes":[2,5,10,15],"page-size":e.queryInfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),a("add-cate-dialog",{ref:"addCateDialogRef"})],1)],1)},n=[],i=a("99a5"),s=(a("6a61"),a("2fbc")),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"cate-table"},[a("el-table",{attrs:{data:e.cateList,"row-key":"cat_id",border:"","tree-props":{children:"children",hasChildren:"Children"}}},[a("el-table-column",{attrs:{prop:"cat_name",label:"分类名称"}}),a("el-table-column",{attrs:{label:"是否有效",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[e.row.cat_deleted?a("i",{staticClass:"el-icon-circle-close",staticStyle:{color:"red"}}):a("i",{staticClass:"el-icon-circle-check",staticStyle:{color:"lightgreen"}})]}}])}),a("el-table-column",{attrs:{label:"排序",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.cat_level?a("el-tag",{attrs:{size:"mini"}},[e._v("一级")]):1==t.row.cat_level?a("el-tag",{attrs:{size:"mini",type:"success"}},[e._v("二级")]):a("el-tag",{attrs:{size:"mini",type:"warning"}},[e._v("三级")])]}}])}),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button-group",[a("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:function(a){return e.editCate(t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(a){return e.deleteCate(t.row)}}},[e._v("删除")])],1)]}}])})],1),a("edit-cate-dialog",{ref:"editCateFromRef",attrs:{currentCate:e.currentCate}})],1)},o=[],u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"edit-cate-dialog"},[a("el-dialog",{attrs:{title:"编辑分类",visible:e.dialogVisible,width:"50%"},on:{"update:visible":function(t){e.dialogVisible=t},open:e.DialogOpen}},[a("el-form",{ref:"editCateFromRef",attrs:{model:e.editCateFrom,rules:e.FromRules,"label-width":"90px","label-position":"left","status-icon":""}},[a("el-form-item",{attrs:{label:"分类名称",prop:"cat_name"}},[a("el-input",{model:{value:e.editCateFrom.cat_name,callback:function(t){e.$set(e.editCateFrom,"cat_name",t)},expression:"editCateFrom.cat_name"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.editCate}},[e._v("确 定")])],1)],1)],1)},l=[],d=a("de5d"),f={name:"editCateDialog",props:{currentCate:{type:Object,default:function(){return{}}}},data:function(){return{dialogVisible:!1,editCateFrom:{},FromRules:{cat_name:[{required:!0,message:"请输入分类名称",trigger:"blur"},{min:2,max:10,message:"长度在 2 到 10 个字符",trigger:"blur"}]}}},methods:{editCate:function(){var e=this;this.$refs.editCateFromRef.validate(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,Object(d["g"])(e.editCateFrom.cat_id,e.editCateFrom.cat_name);case 4:if(r=t.sent,n=r.data,200===n.meta.status){t.next=8;break}return t.abrupt("return",e.$message.error("编辑失败"));case 8:e.$message.success("编辑成功"),e.$parent.$parent.$parent.getCateList(),e.dialogVisible=!1;case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},DialogOpen:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(d["j"])(e.currentCate.cat_id);case 2:if(a=t.sent,r=a.data,200===r.meta.status){t.next=6;break}return t.abrupt("return",e.$message.error("获取当前分类失败"));case 6:e.editCateFrom=r.data;case 7:case"end":return t.stop()}}),t)})))()}}},m=f,p=a("4ac2"),g=Object(p["a"])(m,u,l,!1,null,"3ce02bca",null),b=g.exports,h={name:"CateTable",props:{cateList:{type:Array,default:function(){return[]}}},data:function(){return{currentCate:{}}},components:{editCateDialog:b},methods:{editCate:function(e){console.log(e),this.currentCate=e,this.$refs.editCateFromRef.dialogVisible=!0},deleteCate:function(e){var t=this;this.$confirm("是否删除该分类?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.deleteCateRequest(e),t.$message.success("删除成功!")})).catch((function(){t.$message("已取消删除")}))},deleteCateRequest:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(d["d"])(e.cat_id);case 2:if(r=a.sent,n=r.data,200===n.meta.status){a.next=6;break}return a.abrupt("return",t.$message.error("删除失败"));case 6:t.$parent.$parent.getCateList(),console.log(e);case 8:case"end":return a.stop()}}),a)})))()}}},C=h,v=(a("bd21"),Object(p["a"])(C,c,o,!1,null,"2587a4e6",null)),_=v.exports,y=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"add-cate-dialog"},[a("el-dialog",{attrs:{title:"添加分类",visible:e.dialogVisible,width:"50%"},on:{"update:visible":function(t){e.dialogVisible=t},open:e.DialogOpen,close:e.DialogClose}},[a("el-form",{ref:"addCateFromRef",attrs:{model:e.addCateFrom,rules:e.FromRules,"label-width":"90px","label-position":"left","status-icon":""}},[a("el-form-item",{attrs:{label:"分类名称",prop:"cat_name"}},[a("el-input",{model:{value:e.addCateFrom.cat_name,callback:function(t){e.$set(e.addCateFrom,"cat_name",t)},expression:"addCateFrom.cat_name"}})],1),a("el-form-item",{attrs:{label:"父级分类",prop:"roleDesc"}},[a("el-cascader",{attrs:{options:e.parentCateList,props:e.cascaderProps,clearable:""},on:{change:e.handleChange},model:{value:e.selectedKeys,callback:function(t){e.selectedKeys=t},expression:"selectedKeys"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.addCate}},[e._v("确 定")])],1)],1)],1)},k=[],w={name:"addCateDialog",data:function(){return{dialogVisible:!1,addCateFrom:{cat_pid:0,cat_name:"",cat_level:0},FromRules:{cat_name:[{required:!0,message:"请输入分类名称",trigger:"blur"},{min:2,max:10,message:"长度在 2 到 10 个字符",trigger:"blur"}]},parentCateList:[],cascaderProps:{expandTrigger:"hover",value:"cat_id",label:"cat_name",children:"children",checkStrictly:!0},selectedKeys:[]}},methods:{addCate:function(){var e=this;this.$refs.addCateFromRef.validate(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,Object(d["a"])(e.addCateFrom);case 4:if(r=t.sent,n=r.data,201===n.meta.status){t.next=8;break}return t.abrupt("return",e.$message.error("创建分类失败"));case 8:e.$message.success("创建成功"),e.$parent.$parent.getCateList(),e.dialogVisible=!1;case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},handleChange:function(){if(this.selectedKeys.length>0)return this.addCateFrom.cat_pid=this.selectedKeys[this.selectedKeys.length-1],void(this.addCateFrom.cat_level=this.selectedKeys.length);this.addCateFrom.cat_pid=0,this.addCateFrom.cat_level=0},DialogOpen:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(d["k"])(2);case 2:if(a=t.sent,r=a.data,200===r.meta.status){t.next=6;break}return t.abrupt("return",e.$message.error("获取父级商品失败"));case 6:e.parentCateList=r.data;case 7:case"end":return t.stop()}}),t)})))()},DialogClose:function(){this.$refs.addCateFromRef.resetFields(),this.addCateFrom.cat_pid=0,this.addCateFrom.cat_level=0,this.selectedKeys=[]}}},x=w,O=Object(p["a"])(x,y,k,!1,null,"557b5321",null),j=O.exports,F={name:"Categories",data:function(){return{cateList:[],queryInfo:{type:3,pagenum:1,pagesize:5},total:0}},components:{Breadcrumb:s["a"],CateTable:_,addCateDialog:j},created:function(){this.getCateList()},methods:{addCate:function(){this.$refs.addCateDialogRef.dialogVisible=!0},handleSizeChange:function(e){this.queryInfo.pagesize=e,this.getCateList()},handleCurrentChange:function(e){this.queryInfo.pagenum=e,this.getCateList()},getCateList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(d["k"])(e.queryInfo.type,e.queryInfo.pagenum,e.queryInfo.pagesize);case 2:if(a=t.sent,r=a.data,200===r.meta.status){t.next=6;break}return t.abrupt("return",e.$message.error("获取商品分类失败"));case 6:e.cateList=r.data.result,e.total=r.data.total;case 8:case"end":return t.stop()}}),t)})))()}}},$=F,R=(a("516f"),Object(p["a"])($,r,n,!1,null,"5b184cad",null));t["default"]=R.exports},"2f5a":function(e,t,a){},"2fbc":function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),e._l(e.titles,(function(t){return a("el-breadcrumb-item",{key:t},[e._v(e._s(t))])}))],2)},n=[],i={name:"Breadcrumb",props:{titles:{type:Array,default:function(){return[]}}}},s=i,c=a("4ac2"),o=Object(c["a"])(s,r,n,!1,null,null,null);t["a"]=o.exports},"516f":function(e,t,a){"use strict";a("c608")},bd21:function(e,t,a){"use strict";a("2f5a")},c608:function(e,t,a){},de5d:function(e,t,a){"use strict";a.d(t,"k",(function(){return n})),a.d(t,"a",(function(){return i})),a.d(t,"j",(function(){return s})),a.d(t,"g",(function(){return c})),a.d(t,"d",(function(){return o})),a.d(t,"o",(function(){return u})),a.d(t,"c",(function(){return l})),a.d(t,"n",(function(){return d})),a.d(t,"i",(function(){return f})),a.d(t,"f",(function(){return m})),a.d(t,"m",(function(){return p})),a.d(t,"l",(function(){return g})),a.d(t,"h",(function(){return b})),a.d(t,"e",(function(){return h})),a.d(t,"b",(function(){return C}));var r=a("1bab");function n(e,t,a){return Object(r["a"])({url:"categories",params:{type:e,pagenum:t,pagesize:a}})}function i(e){return Object(r["a"])({url:"categories",method:"post",data:e})}function s(e){return Object(r["a"])({url:"categories/"+e})}function c(e,t){return Object(r["a"])({url:"categories/"+e,method:"put",data:{cat_name:t}})}function o(e,t){return Object(r["a"])({url:"categories/"+e,method:"delete"})}function u(e,t){return Object(r["a"])({url:"categories/"+e+"/attributes",params:{sel:t}})}function l(e,t,a){return Object(r["a"])({url:"categories/"+e+"/attributes",method:"post",data:{attr_name:t,attr_sel:a}})}function d(e,t,a){return Object(r["a"])({url:"categories/"+e+"/attributes/"+t,params:{attr_sel:a}})}function f(e,t,a,n,i){return Object(r["a"])({url:"categories/"+e+"/attributes/"+t,method:"put",data:{attr_name:a,attr_sel:n,attr_vals:i}})}function m(e,t){return Object(r["a"])({url:"categories/"+e+"/attributes/"+t,method:"delete"})}function p(e){return Object(r["a"])({url:"goods",params:e})}function g(e){return Object(r["a"])({url:"goods/"+e})}function b(e,t){return Object(r["a"])({url:"goods/"+e,method:"put",data:t})}function h(e){return Object(r["a"])({url:"goods/"+e,method:"delete"})}function C(e){return Object(r["a"])({url:"goods",method:"post",data:e})}}}]);