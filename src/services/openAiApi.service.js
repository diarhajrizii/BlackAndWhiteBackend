const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openAi = new OpenAIApi(configuration);
async function translateApi({ cca2s, title }) {
  try {
    let response;
    let translatedObj;
    let translatedText;
    if (title.startsWith("<")) {
      response = await openAi.createCompletion({
        model: "text-davinci-003",
        prompt: `"Translate this into ${cca2s}. Return the result in HTML:\n\n${title}",`,
        temperature: 0.3,
        max_tokens: 1000,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
      translatedObj = response.data.choices[0].text;
      translatedText = translatedObj;
    } else {
      response = await openAi.createCompletion({
        model: "text-davinci-003",
        prompt: `"Translate this into ${cca2s}. Return the result in json:\n\n${title}",`,
        temperature: 0.3,
        max_tokens: 1000,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
      translatedObj = JSON.parse(response.data.choices[0].text);
      translatedText = translatedObj.translation || translatedObj[cca2s];
    }

    return { status: true, data: translatedText };
  } catch (error) {
    return { status: false, data: error };
  }
}

module.exports = {
  translateApi,
};
