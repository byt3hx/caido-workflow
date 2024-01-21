export function run(input, sdk) {
  let parsed = sdk.asString(input);

  let regex = /(?:"|')(((?:[a-zA-Z]{1,10}:\/\/|\/\/)[^"'/]{1,}\.[a-zA-Z]{2,}[^"']{0,})|((?:\/|\.\.\/|\.\.\/)[^"'><,;| *()(%%$^\/\\\[\]][^"'><,;|()]{1,})|([a-zA-Z0-9_\-\/]{1,}\/[a-zA-Z0-9_\-\/]{1,}\.(?:[a-zA-Z]{1,4}|action)(?:[\?|#][^"|']{0,}|))|([a-zA-Z0-9_\-\/]{1,}\/[a-zA-Z0-9_\-\/]{3,}(?:[\?|#][^"|']{0,}|))|([a-zA-Z0-9_\-]{1,}\.(?:php|asp|aspx|jsp|json|action|html|js|txt|xml)(?:[\?|#][^"|']{0,}|)))(?:"|')/g;

  let matches = parsed.match(regex);

  if (matches) {
    let uniqueMatches = new Set(
      matches.map(match => match.replace(/"/g, ''))
             .filter(match => !match.includes('http://www.w3.org/2000/svg'))
    );
    return uniqueMatches.size > 0 ? Array.from(uniqueMatches).join('\n') : "No matches found";
  } else {
    return "No matches found";
  }
}
