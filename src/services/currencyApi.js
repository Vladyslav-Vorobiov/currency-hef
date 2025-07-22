export const fetchCurrentRate = async (currency = "USD") => {
  try {
    const response = await fetch(
      `https://smsapi.hefservice.com/rank/?i=2&c=${currency}`
    );
    if (!response.ok) throw new Error("Ошибка при получении курса");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const fetchDailyRates = async (date, currency) => {
  const formData = new FormData();
  formData.append("date", date);
  formData.append("currency", currency);
  formData.append("version", "2");

  const response = await fetch("https://smsapi.hefservice.com/rank/date/", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Ошибка при получении курсов");
  }

  const data = await response.json();

  return data[0];
};
