import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log("Profile Github: ", profile);

        let userRole = "User";
        if (profile?.email == "diptobiswasanime4@gmail.com") {
          userRole = "Admin";
        }

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google: ", profile);

        let userRole = "User";
        if (profile?.email == "diptobiswasanime4@gmail.com") {
          userRole = "Admin";
        }

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username: ",
          type: "text",
          placeholder: "Your username",
        },
        password: {
          label: "Password: ",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials) {
        try {
          const user = {
            name: "Arya Dev",
            username: "diptobiswasanime4",
            password: "abcd1234",
          };

          if (
            credentials.username == user.username &&
            credentials.password == user.password
          ) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile }) {
      if (user) {
        token.role = user.role;
        token.profile = profile;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.profile = token.profile;
        return session;
      }
    },
  },
};
