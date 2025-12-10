// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Get this from tina.io
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  // ADD THIS LINE - bypasses schema mismatch errors
  localContentPath: void 0,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  // Cloudinary media configuration
  // Note: The Cloudinary media store is configured via the API route at api/cloudinary/[...media].ts
  // and should be set up at the provider level, not in the config file
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "images"
    }
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "project",
        label: "Projects",
        path: "src/data/projects",
        format: "json",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.slug || values?.title?.toLowerCase().replace(/ /g, "-")}`;
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
            description: "Used in the URL (e.g., 'my-project' becomes /work/my-project)"
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured on Homepage",
            description: "Show this project on the homepage"
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: ["draft", "published"],
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Project Date",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: [
              { value: "live-events", label: "Live Events" },
              { value: "installation", label: "Installation" },
              { value: "broadcast", label: "Broadcast" },
              { value: "concert", label: "Concert" },
              { value: "experiential", label: "Experiential" },
              { value: "corporate", label: "Corporate" }
            ]
          },
          {
            type: "string",
            name: "tagline",
            label: "Tagline",
            description: "Concise explanation to go beside the title",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "client",
            label: "Client Name"
          },
          {
            type: "string",
            name: "shortDescription",
            label: "Short Description",
            description: "For the project page header",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "rich-text",
            name: "description",
            label: "Long Description",
            description: "Detailed explanation for the INFO section",
            isBody: true
          },
          {
            type: "rich-text",
            name: "credits",
            label: "Project Credits",
            description: "List of credits for the project"
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            description: "Technologies/tools used",
            list: true,
            options: [
              "Media Servers",
              "d3",
              "Notch",
              "TouchDesigner",
              "Projection Mapping",
              "NDI",
              "Unreal Engine",
              "LED Walls",
              "Real-time VFX",
              "Systems Integration",
              "Resolume",
              "IMAG",
              "Interactive",
              "Kinect",
              "Disguise",
              "Motion Graphics"
            ]
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image",
            required: true
          },
          {
            type: "object",
            name: "gallery",
            label: "Media Gallery",
            list: true,
            ui: {
              itemProps: (item) => {
                return {
                  label: item?.caption || item?.type || "Gallery Item"
                };
              }
            },
            fields: [
              {
                type: "string",
                name: "layout",
                label: "Layout",
                description: "Full width or half width (two items side-by-side)",
                options: [
                  { value: "full", label: "Full Width" },
                  { value: "half", label: "Half Width (Side by Side)" }
                ],
                required: true
              },
              {
                type: "string",
                name: "type",
                label: "Media Type",
                options: ["image", "video"],
                required: true
              },
              {
                type: "image",
                name: "image",
                label: "Image"
              },
              {
                type: "string",
                name: "videoUrl",
                label: "Video URL",
                description: "YouTube or Vimeo embed URL"
              },
              {
                type: "string",
                name: "caption",
                label: "Caption"
              }
            ]
          }
        ]
      },
      {
        name: "settings",
        label: "Site Settings",
        path: "src/data",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        match: {
          include: "settings"
        },
        fields: [
          {
            type: "string",
            name: "categories",
            label: "Project Categories",
            description: "Available categories for projects",
            list: true
          },
          {
            type: "string",
            name: "availableTags",
            label: "Available Tags",
            description: "Available tags/technologies for projects",
            list: true
          }
        ]
      },
      // NEW: Site Settings Collection (Contact Email + CV)
      {
        name: "siteSettings",
        label: "Site Settings",
        path: "src/data",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        match: {
          include: "site-settings"
        },
        fields: [
          {
            type: "string",
            name: "contactEmail",
            label: "Contact Email",
            required: true,
            description: "Email address for contact form submissions"
          },
          {
            type: "image",
            name: "cvFile",
            label: "CV/Resume File",
            description: "Upload PDF of CV - this will be used for the 'Download CV' link in footer"
          },
          {
            type: "string",
            name: "socialLinks",
            label: "Social Links",
            description: "Optional social media links (one per line)",
            list: true
          }
        ]
      },
      // Info Page Collection
      {
        name: "info",
        label: "Info Page",
        path: "src/data",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        match: {
          include: "info"
        },
        fields: [
          {
            type: "string",
            name: "bio",
            label: "Bio",
            required: true,
            ui: {
              component: "textarea",
              description: "Main bio text (displays at hero scale on info page)"
            }
          },
          {
            type: "string",
            name: "availability",
            label: "Availability Status",
            required: true,
            ui: {
              description: "Current freelance/employment availability"
            }
          },
          {
            type: "string",
            name: "capabilities",
            label: "Capabilities",
            required: true,
            list: true,
            ui: {
              description: "List of technical capabilities and specializations"
            }
          },
          {
            type: "object",
            name: "pressAndAwards",
            label: "Press & Awards",
            list: true,
            ui: {
              description: "Press mentions, awards, and notable features",
              itemProps: (item) => {
                return { label: item?.title || "New Item" };
              }
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "url",
                label: "URL",
                description: "Optional link (leave blank if no URL)"
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
