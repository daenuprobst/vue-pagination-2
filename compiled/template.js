"use strict";

module.exports = function () {
  return function (h) {

    var items = [];

    this.pages.map(function (page) {
      items.push(h(
        "li",
        { "class": "VuePagination__pagination-item " + this.activeClass(page) },
        [h(
          "a",
          { "class": "pagination-link " + this.activeClass(page), attrs: { href: "javascript:void(0);" },
            on: {
              "click": this.setPage.bind(this, page)
            }
          },
          [page]
        )]
      ));
    }.bind(this));

    return h(
      "nav",
      { "class": "pagination VuePagination" },
      [h(
        "a",
        { "class": "pagination-previous", on: {
            "click": this.prev.bind(this)
          }
        },
        ["Previous"]
      ), h(
        "a",
        { "class": "pagination-next", on: {
            "click": this.next.bind(this)
          }
        },
        ["Next page"]
      ), h(
        "ul",
        {
          directives: [{
            name: "show",
            value: this.totalPages > 1
          }],

          "class": "pagination-list VuePagination__pagination" },
        [!this.isPageVisible(1) && h(
          "li",
          { "class": "VuePagination__pagination-item VuePagination__pagination-item-prev-chunk " + this.allowedChunkClass(-1) },
          [h(
            "a",
            { "class": "pagination-link ", attrs: { href: "javascript:void(0);" },
              on: {
                "click": this.first.bind(this)
              }
            },
            ["1"]
          )]
        ), !this.isPageVisible(1) && h(
          "li",
          null,
          [h(
            "span",
            { "class": "pagination-ellipsis" },
            ["\u2026"]
          )]
        ), items, !this.isPageVisible(this.totalPages) && h(
          "li",
          null,
          [h(
            "span",
            { "class": "pagination-ellipsis" },
            ["\u2026"]
          )]
        ), !this.isPageVisible(this.totalPages) && h(
          "li",
          { "class": "VuePagination__pagination-item VuePagination__pagination-item-next-chunk " + this.allowedChunkClass(1) },
          [h(
            "a",
            { "class": "pagination-link ", attrs: { href: "javascript:void(0);" },
              on: {
                "click": this.last.bind(this)
              }
            },
            [this.totalPages]
          )]
        )]
      )]
    );
  };
};