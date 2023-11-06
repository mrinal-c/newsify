import pandas as pd
import requests
import json
import time

# # read the behaviors.tsv file
# behaviors_df = pd.read_csv('/Users/mrinalc/Desktop/newsify/mind/behaviors.tsv', sep='\t', header=None)
# behaviors_sample = behaviors_df.sample(frac=0.1, replace=False, random_state=42)

# #length of behaviors_sample
# print(len(behaviors_df))
# print(len(behaviors_sample))



# # read the news.tsv file
# news_df = pd.read_csv('/Users/mrinalc/Desktop/newsify/mind/news.tsv', sep='\t', header=None)
# filtered_news = news_df[news_df.iloc[:, 1].isin(['tv', 'music', 'entertainment', 'movies'])]
# # filtered_news.to_csv('/Users/mrinalc/Desktop/newsify/mind/filtered_news.csv', index=False)


# clicks = []
# non_clicks = []
# for index, row in behaviors_sample.iterrows():
#     user_clicks = row[3].split(' ') if not pd.isnull(row[3]) else []
#     user_non_clicks = []
#     logs = row[4].split(' ') if not pd.isnull(row[4]) else []
#     for log in logs:
#         if log.endswith('0'):
#             user_non_clicks.append(log[:-2])
#         else:
#             user_clicks.append(log[:-2])

#     # only keep the news articles that are in the filtered_news
#     user_clicks = list(set(user_clicks).intersection(set(filtered_news.iloc[:, 0])))
#     user_non_clicks = list(set(user_non_clicks).intersection(set(filtered_news.iloc[:, 0])))
#     clicks.append(user_clicks)
#     non_clicks.append(user_non_clicks)



# processed_behavior = pd.DataFrame(columns=['User ID', 'Clicks', 'Non-Clicks'])
# processed_behavior['User ID'] = behaviors_sample.iloc[:, 1]
# processed_behavior['Clicks'] = clicks
# processed_behavior['Non-Clicks'] = non_clicks

# headlines = []
# reactions = []
# for index, row in processed_behavior.iterrows():
#     clicks = row[1]
#     non_clicks = row[2]
#     for click in clicks:
#         headlines.append(filtered_news[filtered_news.iloc[:, 0] == click].iloc[0, 3])
#         reactions.append("like")
#     for non_click in non_clicks:
#         headlines.append(filtered_news[filtered_news.iloc[:, 0] == non_click].iloc[0, 3])
#         reactions.append("dislike")

# headline_reactions = pd.DataFrame(columns=['Headline', 'Reaction'])
# headline_reactions['Headline'] = headlines
# headline_reactions['Reaction'] = reactions
# headline_reactions.to_csv('/Users/mrinalc/Desktop/newsify/mind/headline_reactions.csv', index=False)


# read from headline_reactions csv
headline_reactions = pd.read_csv('/Users/mrinalc/Desktop/newsify/mind/headline_reactions.csv')
headlines = headline_reactions['Headline'].tolist()
reactions = headline_reactions['Reaction'].tolist()

#iterate df 50 and make http call 50 entries at a time with 45 second delay
for index, row in headline_reactions.iterrows():
    if index > 12400 and index % 50 == 0:
        print(index)
        # first 50 headlines values
        first_50_headlines = headlines[index:index+50]
        first_50_reactions = reactions[index:index+50]
        data = {
            "headlines": first_50_headlines,
            "reactions": first_50_reactions
        }
        json_data = json.dumps(data)
        headers = {'Content-Type': 'application/json'}

        # Making a POST request with the provided data
        response = requests.post('http://localhost:5000/bulkReaction', data=json_data, headers=headers)
        if response.status_code == 200:  # 200 indicates success
            print("Request was successful")
            print("Response content:")
            print(response.text)  # This will display the response content
        else:
            print("Request was not successful. Status code:", response.status_code)
        time.sleep(10)






