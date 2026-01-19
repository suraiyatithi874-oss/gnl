$( document ).ready(function() {
    // Shift nav in mobile when clicking the menu.
    $(document).on('click', "[data-toggle='wy-nav-top']", function() {
      $("[data-toggle='wy-nav-shift']").toggleClass("shift");
      $("[data-toggle='rst-versions']").toggleClass("shift");
    });

    // Close menu when you click a link.
    $(document).on('click', ".wy-menu-vertical .current ul li a", function() {
      $("[data-toggle='wy-nav-shift']").removeClass("shift");
      $("[data-toggle='rst-versions']").toggleClass("shift");
    });

    // Keyboard navigation
    document.addEventListener("keydown", function(e) {
        if ($(e.target).is(':input')) return true;
        var key = e.which || e.keyCode || window.event && window.event.keyCode;
        var page;
        switch (key) {
            case 39:  // right arrow
                page = $('[role="navigation"] a:contains(Next):first').prop('href');
                break;
            case 37:  // left arrow
                page = $('[role="navigation"] a:contains(Previous):first').prop('href');
                break;
            default: break;
        }
        if (page) window.location.href = page;
    });

    $(document).on('click', "[data-toggle='rst-current-version']", function() {
      $("[data-toggle='rst-versions']").toggleClass("shift-up");
    });

    // Make tables responsive
    $("table.docutils:not(.field-list)").wrap("<div class='wy-table-responsive'></div>");

    hljs.initHighlightingOnLoad();

    $('table').addClass('docutils');
});

window.SphinxRtdTheme = (function (jquery) {
    var stickyNav = (function () {
        var navBar,
            win,
            stickyNavCssClass = 'stickynav',
            applyStickNav = function () {
                if (navBar.height() <= win.height()) {
                    navBar.addClass(stickyNavCssClass);
                } else {
                    navBar.removeClass(stickyNavCssClass);
                }
            },
            enable = function () {
                applyStickNav();
                win.on('resize', applyStickNav);
            },
            init = function () {
                navBar = jquery('nav.wy-nav-side:first');
                win    = jquery(window);
            };
        jquery(init);
        return {
            enable : enable
        };
    }());
    return {
        StickyNav : stickyNav
    };
}($));

// The code below is a copy of @seanmadsen code posted Jan 10, 2017 on issue 803.
// https://github.com/mkdocs/mkdocs/issues/803
// This just incorporates the auto scroll into the theme itself without
// the need for additional custom.js file.
//
$(function() {
  $.fn.isFullyWithinViewport = function(){
      var viewport = {};
      viewport.top = $(window).scrollTop();
      viewport.bottom = viewport.top + $(window).height();
      var bounds = {};
      bounds.top = this.offset().top;
      bounds.bottom = bounds.top + this.outerHeight();
      return ( ! (
        (bounds.top <= viewport.top) ||
        (bounds.bottom >= viewport.bottom)
      ) );
  };
  if( $('li.toctree-l1.current').length && !$('li.toctree-l1.current').isFullyWithinViewport() ) {
    $('.wy-nav-side')
      .scrollTop(
        $('li.toctree-l1.current').offset().top -
        $('.wy-nav-side').offset().top -
        60
      );
  }
});





// ==============================
//  picture compoenets 
// ================================

function openModal(element) {
  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("fullImg");
  var captionText = document.getElementById("caption");
  var clickedImg = element.previousElementSibling; // Gets the img tag

  modal.style.display = "block";
  modalImg.src = clickedImg.src;
  captionText.innerHTML = clickedImg.alt;
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}




// ====================================
// searching

// =======================================

document.addEventListener('DOMContentLoaded', function() {
   

    // 2. STYLING THE DROPDOWN
    const style = document.createElement('style');
   

    style.innerHTML = `
    .search-results-container {
        position: absolute;
        background: #ffffff;
        width: 100%;
        z-index: 9999;
        top: 100%;
        left: 0;
        margin-top: 5px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.05);
        max-height: 350px;
        overflow-y: auto;
        display: none;
        border: 1px solid rgba(0,0,0,0.08);
        animation: fadeInSlide 0.2s ease-out;
    }

    @keyframes fadeInSlide {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Modern Scrollbar */
    .search-results-container::-webkit-scrollbar {
        width: 6px;
    }
    .search-results-container::-webkit-scrollbar-thumb {
        background: #e1e4e5;
        border-radius: 10px;
    }

    .search-result-item {
        padding: 12px 16px;
        border-bottom: 1px solid #f4f6f8;
        display: flex;
        flex-direction: column;
        color: #444 !important;
        text-decoration: none;
        font-size: 13px;
        transition: all 0.15s ease-in-out;
        position: relative;
    }

    .search-result-item:last-child {
        border-bottom: none;
    }

    .search-result-item strong {
        display: block;
        color: #2c3e50;
        font-weight: 700;
        margin-bottom: 3px;
    }

    /* Sub-text or Tag effect */
    .search-result-item::after {
        content: "Documentation Site Section";
        font-size: 10px;
        color: #95a5a6;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    /* Professional Hover Effect */
    .search-result-item:hover {
        background: #f8f9ff;
        padding-left: 22px; /* Smooth shift */
        color: #09173b !important;
    }

    /* Sidebar Highlight Bar on Hover */
    .search-result-item:hover::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: #09173b; /* Your purple brand color */
        border-radius: 0 4px 4px 0;
    }

    .search-result-item:hover strong {
        color: #09173b;
    }
`;




    document.head.appendChild(style);

    // 3. SEARCH LOGIC
    document.querySelectorAll('.wy-form').forEach(form => {
        const input = form.querySelector('input[name="q"]');
        const resultsBox = document.createElement('div');
        resultsBox.className = 'search-results-container';
        form.style.position = 'relative';
        form.appendChild(resultsBox);

        input.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            resultsBox.innerHTML = '';

            if (query.length < 1) {
                resultsBox.style.display = 'none';
                return;
            }

            const matches = searchData.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.tags.toLowerCase().includes(query)
            );

            if (matches.length > 0) {
                resultsBox.style.display = 'block';
                matches.forEach(item => {
                    // AUTO-PATH CORRECTION:
                    // If we are currently inside the "pages" folder, 
                    // and the link starts with "pages/", we remove "pages/" and add nothing.
                    // If the link is "index.html", we change it to "../index.html".
                    let finalUrl = item.url;
                    const isInsidePages = window.location.pathname.includes('/pages/');

                    if (isInsidePages) {
                        if (finalUrl.startsWith('pages/')) {
                            finalUrl = finalUrl.replace('pages/', '');
                        } else if (finalUrl === 'index.html') {
                            finalUrl = '../index.html';
                        }
                    }

                    const a = document.createElement('a');
                    a.href = finalUrl;
                    a.className = 'search-result-item';
                    a.innerHTML = `<strong>${item.title}</strong>`;
                    resultsBox.appendChild(a);
                });
            } else {
                resultsBox.style.display = 'none';
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!form.contains(e.target)) resultsBox.style.display = 'none';
        });
    });
});
