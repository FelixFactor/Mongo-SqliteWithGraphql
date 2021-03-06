import { Friends, Aliens} from "./dbConnectors"; 

//resolver Map
export const resolvers = {
    Query: {
        //Mongo query
        getOneFriend: (root, { id }) => {
            return new Promise(( resolve, object) => {
                Friends.findById(id, (err, friend) => {
                    if(err) reject(err)
                    else resolve(friend)
                })
            })
        },
        //Mongo query
        getAllFriends: () => {
            return Friends.find();
        },
        //SQLite query
        getAliens: () => {
            return Aliens.findAll();
        }
    },
    Mutation:{
        createFriend: (root, { input }) => {
            const newFriend = new Friends({
                firstName: input.firstName,
                lastName: input.lastName,
                gender: input.gender,
                language: input.language,
                age: input.age,
                email: input.email,
                contacts: input.contacts
            });

            newFriend.id = newFriend._id;

            return new Promise((resolve, object) => {
                newFriend.save((err) => {
                    if(err) reject(err)
                    else resolve(newFriend)
                })
            })
        },
        updateFriend: (root, { input }) => {
            return new Promise(( resolve, object) => {
                Friends.findOneAndUpdate({_id: input.id }, input, { new: true }, (err, friend) => {
                    if(err) reject(err)
                    else resolve(friend)
                })
            })
        },
        deleteFriend: (root, { id }) => {
            return new Promise(( resolve, object) => {
                Friends.remove({_id: id }, (err) => {
                    if(err) reject(err)
                    else resolve("Successfully deleted friend.")
                })
            })
        }
    },
};
