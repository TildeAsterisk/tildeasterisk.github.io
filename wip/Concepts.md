---
date: 2022-10-17
---
# ~* Downloaders and Converters
Youtube, spotify, blogger anything video downloader. Mp3 converter
File converter?
# Spotify Visualiser Plugin

# Fully Local Backup 'Mist'

# Remote Control Man (Active Ragdoll Game)

# Write papers about:
- [ ] [Physicanim](../Projects/Physicanim)
- [ ] Agents in Simulation. No player game of life. Simulation theory, game research, ai, flocks....
- [ ] Common Creation Myth Motifs
- [ ] The Secret (Success, Motivation, Achieving Goals, Planning, Vision)
- [ ] Fake Money
- [ ] Modern Evolution of Language
- [ ] Nature of Reality and Consciousness
- [ ] Ancient Scientific and Moral Wisdom Embedded in Myth and Religious Stories (Spoken Vs Written Traditions)

# Robot Kinect
Recently I have been working on integrating the Xbox 360 Kinect v1 with ROS. I played around with a number of packages to use for this robotics project, including: GoogleAssisstantSDK, OpenCV (opencv_examples, opencv_apps) and IFTTT webhooks integration.
## Some Points
- 🤖 Created [ZionRobot](https://www.blogger.com/u/1/blog/post/edit/5175033775044694573/711761186766816126?hl=en-GB#) ROS package that when launched, runs a script that moves the motors to tilt the kinect and produces an RViz view showing an RGB point cloud.
- 🗣 Set up custom voice commands for the Google Assistant AI, using IFTTT (If This Then That) to communicate with the robot using webhooks, HTTP requests, Flask server.
- 💻 Set up a linux server, customised boot config, logos android  system environment. Created custom search and update bash commands.
- 📶 ESP8266 + ESP Link v1.0 Wi-Fi Module. Webhook. DIY IoT
- 👾 Electronics:
	- iPod Classic with USB-C?!
	- ACEPC Mini PC
	- Raspberry Pi 3A+

## The Specs

| Spec Type:     | Info:           |
| -------------- | --------------- |
| OS:            | Ubuntu 20.04.5  |
| ROS Version:   | Noetic          |
| ROS Packages:  | freenect_stack  |
| ''             | kinect_aux      |
| ''             |                 |
| ''             | AI Chatbot?     |


# Web Workflow
Obsidian Vault -> GitHub Pages Workflow
With iCloud syncing
-
Backend: Render
Frontend: Github Pages
-
PayPal Product Link
Alternative Store page (with basket and stuff...):
	Shop: Big Cartel
E-Commerce Management: DSers


<style>
	.buybutton {
	    color: white;
	    border: 2px solid #555555;
	  }
	
	  .buybutton:hover {
	    background-color: #555555;
	    color: white;
	    }
	
	  .buybutton_soldout {
	    color: grey;
	    border: 2px solid #555555;
	    background-color:rgb(255,0,0,0.1);
	  }
	
	  .buybutton_soldout:hover {
	    background-color:rgb(255,0,0,0.5);
	    color: white;
	    }
</style>
<script type="text/javascript">
  /*<![CDATA[*/
  (function () {
    var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }
    function loadScript() {
      var script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
      script.onload = ShopifyBuyInit;
    }
    function ShopifyBuyInit() {
      var client = ShopifyBuy.buildClient({
        domain: 'tildeasterisk.myshopify.com',
        storefrontAccessToken: '044cab259b34661eb3a7a0c729265bd9',
      });
      ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent('product', {
          id: '8058163069157',
          node: document.getElementById('product-component-1665349368523'),
          moneyFormat: '%C2%A3%7B%7Bamount%7D%7D',
          options: {
    "product": {
      "styles": {
        "product": {
          "@media (min-width: 601px)": {
            "max-width": "calc(25% - 20px)",
            "margin-left": "20px",
            "margin-bottom": "50px"
          }
        },
        "title": {
          "color": "#ffffff"
        },
        "button": {
          "font-family": "Montserrat, sans-serif",
          "font-weight": "bold",
          "font-size": "18px",
          "padding-top": "17px",
          "padding-bottom": "17px",
          ":hover": {
            "background-color": "#019bad"
          },
          "background-color": "#01acc0",
          ":focus": {
            "background-color": "#019bad"
          },
          "border-radius": "40px",
          "padding-left": "42px",
          "padding-right": "42px"
        },
        "quantityInput": {
          "font-size": "18px",
          "padding-top": "17px",
          "padding-bottom": "17px"
        },
        "price": {
          "color": "#ffffff"
        },
        "compareAt": {
          "color": "#ffffff"
        },
        "unitPrice": {
          "color": "#ffffff"
        },
        "description": {
          "color": "#ffffff"
        }
      },
      "contents": {
        "img": false,
        "button": false,
        "buttonWithQuantity": true,
        "title": false,
        "price": false
      },
      "text": {
        "button": "Add to cart"
      },
      "googleFonts": [
        "Montserrat"
      ]
    },
    "productSet": {
      "styles": {
        "products": {
          "@media (min-width: 601px)": {
            "margin-left": "-20px"
          }
        }
      }
    },
    "modalProduct": {
      "contents": {
        "img": false,
        "imgWithCarousel": true,
        "button": false,
        "buttonWithQuantity": true
      },
      "styles": {
        "product": {
          "@media (min-width: 601px)": {
            "max-width": "100%",
            "margin-left": "0px",
            "margin-bottom": "0px"
          }
        },
        "button": {
          "font-family": "Montserrat, sans-serif",
          "font-weight": "bold",
          "font-size": "18px",
          "padding-top": "17px",
          "padding-bottom": "17px",
          ":hover": {
            "background-color": "#019bad"
          },
          "background-color": "#01acc0",
          ":focus": {
            "background-color": "#019bad"
          },
          "border-radius": "40px",
          "padding-left": "42px",
          "padding-right": "42px"
        },
        "quantityInput": {
          "font-size": "18px",
          "padding-top": "17px",
          "padding-bottom": "17px"
        },
        "title": {
          "font-family": "Helvetica Neue, sans-serif",
          "font-weight": "bold",
          "font-size": "26px",
          "color": "#4c4c4c"
        },
        "price": {
          "font-family": "Helvetica Neue, sans-serif",
          "font-weight": "normal",
          "font-size": "18px",
          "color": "#4c4c4c"
        },
        "compareAt": {
          "font-family": "Helvetica Neue, sans-serif",
          "font-weight": "normal",
          "font-size": "15.299999999999999px",
          "color": "#4c4c4c"
        },
        "unitPrice": {
          "font-family": "Helvetica Neue, sans-serif",
          "font-weight": "normal",
          "font-size": "15.299999999999999px",
          "color": "#4c4c4c"
        },
        "description": {
          "font-family": "Helvetica Neue, sans-serif",
          "font-weight": "normal",
          "font-size": "14px",
          "color": "#4c4c4c"
        }
      },
      "googleFonts": [
        "Montserrat"
      ],
      "text": {
        "button": "Add to cart"
      }
    },
    "option": {},
    "cart": {
      "styles": {
        "button": {
          "font-family": "Montserrat, sans-serif",
          "font-weight": "bold",
          "font-size": "18px",
          "padding-top": "17px",
          "padding-bottom": "17px",
          ":hover": {
            "background-color": "#019bad"
          },
          "background-color": "#01acc0",
          ":focus": {
            "background-color": "#019bad"
          },
          "border-radius": "40px"
        }
      },
      "text": {
        "total": "Subtotal",
        "button": "Checkout"
      },
      "googleFonts": [
        "Montserrat"
      ]
    },
    "toggle": {
      "styles": {
        "toggle": {
          "font-family": "Montserrat, sans-serif",
          "font-weight": "bold",
          "background-color": "#01acc0",
          ":hover": {
            "background-color": "#019bad"
          },
          ":focus": {
            "background-color": "#019bad"
          }
        },
        "count": {
          "font-size": "18px"
        }
      },
      "googleFonts": [
        "Montserrat"
      ]
    }
  },
        });
      });
    }
  })();
  /*]]>*/
</script>
