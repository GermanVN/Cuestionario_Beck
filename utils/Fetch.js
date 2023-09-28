

export const fetchResponse =  async (input, count, total= 0) => {

    try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: input, question: count, total: total }),
        });
  
        const response2 = await response.json();
        const botReply = response2.result;
  
        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }

        return botReply
  
        
      } catch (error) {
        // Consider implementing your own error handling logic here
        alert(error.message);
      }

}