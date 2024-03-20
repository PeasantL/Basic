//Current implement fields for the settings

//Todo -> seperate dataFormat
export const dataFormat = {
  alternate_greetings: [],
  avatar: "",
  character_version: "",
  creator: "",
  creator_notes: "",
  description: "",
  extensions: [],
  first_mes: "",
  mes_example: "",
  name: "",
  personality: "",
  post_history_instructions: "",
  scenario: "",
  system_prompt: "",
  tags: [],
};

//Tags should be shown as badges -> See chub.ai and bootstrap react badges
export const dataCategories = {
  defaultSetting: ["alternate_greetings", "first_mes", "mes_example"],
  addSetting: [
    "description",
    "name",
    "personality",
    "post_history_instructions",
    "scenario",
    "system_prompts",
  ],
  miscSettings: ["avatar", "creator", "creator_notes"],
  tags: "tags",
};

//Fields that will be edited by the convertion settings.
export const relevantDataFields = {
  first_mes: "",
  mes_example: "",
  alternate_greetings: [],
};
