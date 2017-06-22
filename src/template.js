module.exports = function() {
  return function(h) {

  var items = [];

  this.pages.map(function(page) {
      items.push(
        <li class={"VuePagination__pagination-item "+this.activeClass(page)}>
        <a class={"pagination-link "+this.activeClass(page)} href="javascript:void(0);" on-click={this.setPage.bind(this, page)}>{page}</a>
        </li>
      )
  }.bind(this));

  return <nav class="pagination VuePagination">
  <a class="pagination-previous" on-click={this.prev.bind(this)}>Previous</a>
  <a class="pagination-next" on-click={this.next.bind(this)}>Next page</a>
  <ul v-show={this.totalPages>1}
  class="pagination-list VuePagination__pagination">

  <li class={"VuePagination__pagination-item VuePagination__pagination-item-prev-chunk "+this.allowedChunkClass(-1)}>
  <a class="pagination-link" href="javascript:void(0);"
  on-click={this.setChunk.bind(this,-1)}>&lt;&lt;</a>
  </li>

  {items}

  <li class={"VuePagination__pagination-item VuePagination__pagination-item-next-chunk "+this.allowedChunkClass(1)}>
  <a class="pagination-link" href="javascript:void(0);"
  on-click={this.setChunk.bind(this,1)}>&gt;&gt;</a>
  </li>
  </ul>
  </nav>
}
}
