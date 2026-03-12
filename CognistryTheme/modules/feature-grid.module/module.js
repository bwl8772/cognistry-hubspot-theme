[
  {
    "name": "eyebrow",
    "label": "Eyebrow",
    "type": "text",
    "required": false,
    "default": "Core capabilities"
  },
  {
    "name": "heading",
    "label": "Heading",
    "type": "text",
    "required": false,
    "default": "Explain the platform clearly"
  },
  {
    "name": "intro",
    "label": "Intro",
    "type": "richtext",
    "required": false,
    "default": "<p>Use this section to explain the major capabilities, product pillars, or operational outcomes.</p>"
  },
  {
    "name": "columns",
    "label": "Columns",
    "type": "choice",
    "display": "select",
    "choices": [
      ["2", "2 columns"],
      ["3", "3 columns"],
      ["4", "4 columns"]
    ],
    "required": false,
    "default": "3"
  },
  {
    "name": "features",
    "label": "Feature cards",
    "type": "group",
    "occurrence": {
      "min": 1,
      "max": 8,
      "sorting_label_field": "title",
      "default": 3
    },
    "children": [
      {
        "name": "image",
        "label": "Image",
        "type": "image",
        "required": false
      },
      {
        "name": "kicker",
        "label": "Kicker",
        "type": "text",
        "required": false
      },
      {
        "name": "title",
        "label": "Title",
        "type": "text",
        "required": false,
        "default": "Feature title"
      },
      {
        "name": "text",
        "label": "Text",
        "type": "richtext",
        "required": false,
        "default": "<p>Explain what this feature does and why it matters.</p>"
      },
      {
        "name": "link_text",
        "label": "Link text",
        "type": "text",
        "required": false,
        "default": "Learn more"
      },
      {
        "name": "link",
        "label": "Link",
        "type": "link",
        "required": false
      }
    ]
  }
]