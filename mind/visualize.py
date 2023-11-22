import numpy as np
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
import requests
import numpy as np
from mpl_toolkits.mplot3d import Axes3D

# Assuming 'vectors' is your array of vectors (n vectors each of 4096 dimensions)
# Replace this with your actual data
data = requests.post('https://newsify-a03f785.svc.gcp-starter.pinecone.io/query', headers={'Api-Key': 'f4773cd9-8eaa-422c-adf9-dc5b8f885fad', "Content-Type": "application/json"}, json={'top_k': 2000, 'include_metadata': True, 'include_values': True, 'filter': {'uid': 'base'}, 'vector': np.zeros(4096).tolist()})
matches = data.json()['matches']
# print(matches)
vectors = [match['values'] for match in matches]
like_vectors = [match['values'] for match in matches if match['metadata']['reaction'] == 'like']
dislike_vectors = [match['values'] for match in matches if match['metadata']['reaction'] == 'dislike']
# print(vectors)
# Create a PCA instance with the desired number of components (let's say 2 for 2D visualization)
pca = PCA(n_components=3)

# Fit the PCA model to your data
pca.fit(vectors)


# Transform the data to the 2D principal components
likes_3d = pca.transform(like_vectors)
dislike_3d = pca.transform(dislike_vectors)

# Plotting the 2D representation of vectors
fig = plt.figure(figsize=(8, 6))
ax = fig.add_subplot(111, projection='3d')
ax.scatter([x[0] for x in likes_3d], [x[1] for x in likes_3d], [x[2] for x in likes_3d], color='blue', label='Like')
ax.scatter([x[0] for x in dislike_3d], [x[1] for x in dislike_3d], [x[2] for x in dislike_3d], color='red', label='Dislike')
ax.legend()

ax.set_title('3D Scatter Plot of Likes and Dislikes')
ax.set_xlabel('X-axis')
ax.set_ylabel('Y-axis')
ax.set_zlabel('Z-axis')

plt.show()
