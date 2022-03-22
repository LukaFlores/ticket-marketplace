
Required: 
    - Docker Desktop app (With kubernetes active)
    - Install Ingress-nginx
        Run this command in terminal
            kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml

    - Allow post.com on localhost
        1. For mac add to file /etc/hosts
        2. 127.0.0.1 posts.com -- at the bottom of the file 

To Start Development Server:
    - Brew install skaffold
    - Run command:
        skaffold dev