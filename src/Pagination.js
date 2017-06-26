let template = require('./template.js');
let bus = require('./bus');

module.exports =
{
  render:template(),
  props: {
    for: {
      type: String,
      required: true
    },
    records: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: false,
      default: 25
    },
    chunk: {
      type: Number,
      required: false,
      default: 10
    },
    countText: {
      type: String,
      required: false,
      default: ''
      //default: 'Showing {from} to {to} of {count} records|{count} records|One record'
    },
    vuex: {
      type: Boolean
    }
  },
  created: function() {

    if (!this.vuex) return;

    let name = this.for;

    if (this.$store.state[name]) return;

    this.$store.registerModule(this.for,  {
      state: {
        page: 1
      },
      mutations: {
       [`${name}/PAGINATE`] (state, page) {
        state.page = page
      }
    }
  })
  },
  data: function() {
    return  {
      Page:1
    }
  },
  computed: {
    page() {
      return this.vuex?this.$store.state[this.for].page:this.Page;
    },
    pages: function() {
      if (!this.records)
        return [];

      let to = this.page + Math.round(this.chunk / 2.0);

      return range(this.paginationStart, to >= this.totalPages ? this.totalPages : to);
    },
    totalPages: function() {
      return this.records?Math.ceil(this.records / this.perPage):1;
    },
    totalChunks: function() {
      return Math.ceil(this.totalPages / this.chunk);
    },
    currentChunk: function() {
      return Math.ceil(this.page / this.chunk);
    },
    paginationStart: function() {
      let start = this.page - Math.round(this.chunkt / 2.0);
      return start <= 1 ? 1 : start; 
   },
   pagesInCurrentChunk: function() {

    return this.paginationStart + this.chunk <= this.totalPages?
    this.chunk:
    this.totalPages - this.paginationStart + 1;

  },
  count: function() {

    let from = ((this.page-1) * this.perPage) + 1;
    let to = this.page==(this.totalPages)?this.records:from + this.perPage - 1;
    let parts = this.countText.split('|');
    let i = Math.min(this.records==1?2:this.totalPages==1?1:0, parts.length-1);
    
    return parts[i].replace('{count}', this.records)
    .replace('{from}', from)
    .replace('{to}', to)
  }
},
methods: {
  setPage: function(page) {
    if (this.allowedPage(page)) {
     this.paginate(page);
   }
 },
 paginate(page) {
  if (this.vuex) {
    this.$store.commit(`${this.for}/PAGINATE`,  page);
  } else {
    this.Page = page;
    bus.$emit('vue-pagination::' + this.for, page);
  }
},
first: function() {
  return this.setPage(1);
},
last: function() {
  return this.setPage(this.totalPages);
},
next: function() {
  return this.setPage(this.page + 1);
},
prev: function() {
  return this.setPage(this.page -1);
},
nextChunk: function() {
  return this.setChunk(1);
},
prevChunk: function() {
  return this.setChunk(-1);
},
setChunk: function(direction) {
  this.setPage((((this.currentChunk -1) + direction) * this.chunk) + 1);
},
allowedPage: function(page) {
  return page>=1 && page<=this.totalPages;
},
allowedChunk: function(direction) {
  return (direction==1 && this.currentChunk<this.totalChunks)
  ||  (direction==-1 && this.currentChunk>1);
},
allowedPageClass: function(direction) {
  return this.allowedPage(direction)?'':'disabled';
},
allowedChunkClass: function(direction) {
  return this.allowedChunk(direction)?'':'disabled';
},
activeClass: function(page) {
  return this.page==page?'is-current':'';
}
}
}

function range(start, count) {
  return Array.apply(0, Array(count))
  .map(function (element, index) {
   return index + start;
 });
}
