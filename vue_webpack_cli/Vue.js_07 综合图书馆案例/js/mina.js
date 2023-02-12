const app = new Vue({
  el:'.box',
  data:{
    books:[
      {
        id: 1,
        name: '《算法导论》',
        data: '2006-9',
        price: 85.00,
        count: 1
      },
      {
        id: 2,
        name: '《UINIX编程艺术》',
        data: '2006-2',
        price: 59.00,
        count: 1
      },
      {
        id: 3,
        name: '《编程珠玑》',
        data: '2008-10',
        price: 39.00,
        count: 1
      },
      {
        id: 4,
        name: '《代码大全》',
        data: '2006-3',
        price: 128.00,
        count: 1
      }
    ]
  },//filters 过滤器
  filters:{
    //价格显示格式
    showPrice(price){
      return price.toFixed(2);
    }
  },
  methods: {
    add(item){
      item.count++;
    },
    reduce(item){
      item.count--;
    },
    remove(index){
      this.books.splice(index,1);
    }
  },
  computed: {
    allPrice(){
      // let res = 0;
      // for(book of this.books){
      //   res += book.price * book.count;
      // }
      // return res;

      let res = this.books.reduce((pre,book)=>{
        return pre + book.price * book.count;
      },0);
      return res;
    }
  },
})