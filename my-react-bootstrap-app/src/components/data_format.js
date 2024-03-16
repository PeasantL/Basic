//Current implement fields for the settings 
export const dataFormat = {
    "alternate_greetings": [],
    "avatar": "",
    "character_version": "",
    "creator": "",
    "creator_notes": "",
    "description": "",
    "extensions": "",
    "first_mes": "",
    "mes_example": "",
    "name": "",
    "personality": "",
    "post_history_instructions": "",
    "scenario": "",
    "system_prompt": "",
    "tags": []
}

//Image setting 
export const imageStyle = {
    width: '55%', // Scale width to 100% of its container 
    height: 'auto', // Adjust height automatically
    // For more control, you can use 'object-fit' property to specify how the image should be resized
    objectFit: 'cover', // 'cover', 'contain', 'fill', 'scale-down', or 'none'
}


//Alternate greeting removed for now, to be implemented
//Fields that will be edited by the convertion settigns.
export const relevantDataFields = {
    "first_mes": "",
    "mes_example": "",
}