# Rapydonate

[![Watch the video](https://user-images.githubusercontent.com/24523985/173189490-13c0b4b9-ea14-43ea-b30d-94e7f3bbc4f3.jpg)](https://www.youtube.com/watch?v=RLvf2w61VeQ)

Rapydonate is a platform-independent fintech project that provides content creators with income. It consists of project management panel, browser extension and donation page components. 

## Table of Contents
  - [Inspiration](#inspiration)
  - [How It Works?](#howitworks)
  - [Installation](#installation)

<h2 id="inspiration">Inspiration</h2>

Today, people produce educational, entertainment and news content for social media platforms. Thanks to the income from these platforms, content creators continue their lives and obtain resources to produce new content. Although it seems easy, there are a few problems especially in monetization.

**Problems for Content Creators**

- Each platform has its own monetization system (ads, views, donations, followers).
- Some social media platforms do not currently have a monetization.
- On some platforms, you need to reach the minimum number of followers in order to start the monetization.
- The policy and rules of each platform are different. If you violate the rules, your income may be suspended or your account may be closed.
- Deductions and taxes across platforms differ.
- Many platforms require people to subscribe or sign in to your channel for them to monetize you. This is inconvenient for them and results in reduced revenues for content creators.

**Problems for Supporters**

- To support a content creator you love, you need to use the social media platform they use. One creator may be on Youtube while the other may be on Twitch.
- To monetize the creator, you need to create an account on the platform and share your card information with this platform. The security of shared card information may be compromised as a result of cyber attacks.
- In order to support the creator, you must be signed in to the platform. You need to store a lot of user name and password information for different platforms.

**What if we could separate the platform and the monetization?**

- Doesn't that save creators from being tied to a particular platform?
- Could we prevent platform policy and rules from restricting content creators?
- Can we prevent people from sharing their personal information such as credit cards and phone numbers with these platforms?

<h2 id="howitworks">How It Works?</h2>

Content creators create projects through the Rapydonate administration panel. Within the project, they define social media links and determine donation amounts. A wallet is automatically created in the background for the content creators on [Rapyd](https://www.rapyd.net/).

![Login Page](https://user-images.githubusercontent.com/24523985/173189820-ad58776f-bb22-4215-b3ac-03354a783826.jpg)

Content producers can also follow incoming donations on this platform.

![Rapydonate Panel](https://user-images.githubusercontent.com/24523985/173189968-ca4b7e0a-6502-43d9-a884-39e7c0df5571.jpg)

By installing the [browser extension](https://github.com/bk52/rapydonate-extension), users can easily donate without logging in or sharing personal data. 

![Chrome Extension](https://user-images.githubusercontent.com/24523985/173190083-30340ef5-eb86-4a20-b4bf-c495bcd7b16a.jpg)

For extension details please [visit](https://github.com/bk52/rapydonate-extension).

Rapydonate also creates a project page for donation. Browsers and mobile devices that do not support the extension can be directed to this page to collect donations.

![Donate Page](https://user-images.githubusercontent.com/24523985/173190174-6313d34b-df72-47e3-8bf8-24d4511e4108.jpg)

<h2 id='installation'>Installation</h2>

1. Clone repository

- git clone https://github.com/bk52/rapydonate

2. Server installation
- Create .env file in server folder and define parameters in below

PORT=9600

ACCESS_TOKEN_SECRET=Abc01dEfgH

ACCESS_TOKEN_LIFE=86400

REFRESH_TOKEN_SECRET=abc012defgh34ijklmnprstuvyzxabcd5e

REFRESH_TOKEN_LIFE=86400

DB_USERNAME=**MONGODB USERNAME**

DB_PASSWORD=**MONGODB PASSWORD**

DB_NAME=rapydonate

AES_DB_KEY=012A3B45C67DE8FG

AES_API_KEY=23A45BC678D90123

API_HEADER_KEY=123456

RAPYD_ACCESS_KEY=**RAPYD ACCESS KEY**

RAPYD_SECRET_KEY=**RAPYD SECRET KEY**

3. Return to home folder

- npm run start
