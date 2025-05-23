import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';

import { COLORS, FONTS, SIZES, icons } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 2124802010151 - Lê Sỹ Hoài
// 2124802010172 - Cao Thành Phát
// 2124802010807 - Nguyễn Đức Thắng

const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 18 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}></View>
        </View>
    )
};

const Home = ({ navigation }) => {
    const [profile, setProfile] = useState({ name: '', point: 0 });
    const [books, setBooks] = useState([]);
    const [myBooks, setMyBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(1);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const res = await fetch('http://192.168.153.19:7181/api/Auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();
                setProfile({
                    name: data.firstName + ' ' + data.lastName,
                    point: 200
                });
            } catch (err) {
                console.error('Lỗi lấy thông tin người dùng:', err);
            }
        };

        const fetchBooks = async () => {
            try {
                const res = await fetch('http://192.168.153.19:7181/api/Books');
                const data = await res.json();
                setBooks(data);
                setMyBooks(data);
                setCategories([
                    {
                        id: 1,
                        categoryName: "Best Seller",
                        books: data.slice(0, 3)
                    },
                    {
                        id: 2,
                        categoryName: "The Latest",
                        books: data.slice(3, 6)
                    },
                    {
                        id: 3,
                        categoryName: "Coming Soon",
                        books: data.slice(6, 9)
                    }
                ]);
            } catch (err) {
                console.error('Lỗi lấy danh sách sách:', err);
            }
        }

        fetchUser();
        fetchBooks();
    }, []);

    const renderHeader = () => (
        <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.padding, alignItems: 'center', marginTop: SIZES.padding }}>
            <View style={{ flex: 1 }}>
                <Text style={{ ...FONTS.h3, color: COLORS.white }}>Good Morning</Text>
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>{profile.name}</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: COLORS.primary, height: 40, paddingLeft: 3, paddingRight: SIZES.radius, borderRadius: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={icons.plus_icon} style={{ width: 20, height: 20, marginHorizontal: 5 }} />
                    <Text style={{ color: COLORS.white, ...FONTS.body3 }}>{profile.point} point</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
    
    function renderButtonSection() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: SIZES.padding }}>
                <View style={{ flexDirection: 'row', height: 70, backgroundColor: COLORS.secondary, borderRadius: SIZES.radius }}>
                    {/* Claim */}
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => console.log("Claim")}
                    >
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.claim_icon}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white }}>Claim</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Divider */}
                    <LineDivider />

                    {/* Get Point */}
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => console.log("Get Point")}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                source={icons.point_icon}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white }}>Get Point</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Divider */}
                    <LineDivider />

                    {/* My Card */}
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => console.log("My Card")}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                source={icons.card_icon}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white }}>My Card</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    const renderMyBookSection = () => (
        <View style={{ marginTop: SIZES.padding }}>
            <Text style={{ ...FONTS.h2, color: COLORS.white, paddingHorizontal: SIZES.padding, marginBottom: SIZES.base }}>My Books</Text>
            <FlatList
                data={myBooks}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => `${item.id}`}
                contentContainerStyle={{ paddingLeft: SIZES.padding }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                    onPress={() => navigation.navigate("BookDetail", {
                        book: {
                          ...item,
                          bookCoverUrl: `http://192.168.153.19:7181${item.bookCover}`,
                          backgroundColor: "rgba(240,240,232,0.9)", // hoặc dữ liệu thực tế
                          navTintColor: "#000" // hoặc "#fff" tùy giao diện bạn thiết kế
                        }
                      })}
                        style={{ marginRight: SIZES.radius }}
                    >
                        <Image source={{ uri: `http://192.168.153.19:7181${item.bookCover}` }} style={{ width: 120, height: 180, borderRadius: 10 }} />
                        <View style={{ marginTop: SIZES.base }}>
                            <Text style={{ color: COLORS.white, ...FONTS.body3 }}>{item.bookName}</Text>
                            <Text style={{ color: COLORS.lightGray, ...FONTS.body4 }}>{item.completion ? item.completion : '0%'} read</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );

    const renderCategoryHeader = () => (
        <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedCategory(item.id)} style={{ marginRight: SIZES.padding }}>
                        <Text style={{ ...FONTS.h2, color: selectedCategory === item.id ? COLORS.white : COLORS.lightGray }}>{item.categoryName}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );

    const renderCategoryData = () => {
        const category = categories.find(cat => cat.id === selectedCategory);
        const books = category ? category.books : [];

        return (
            <View style={{ flex: 1, marginTop: SIZES.radius, paddingLeft: SIZES.padding }}>
                <FlatList
                    data={books}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{ flexDirection: 'row', marginVertical: SIZES.base }}
                            onPress={() => navigation.navigate("BookDetail", {
                                book: {
                                  ...item,
                                  bookCoverUrl: `http://192.168.153.19:7181${item.bookCover}`,
                                  backgroundColor: "rgba(240,240,232,0.9)", 
                                  navTintColor: "#000" 
                                }
                              })}
                        >
                            <Image source={{ uri: `http://192.168.153.19:7181${item.bookCover}` }} style={{ width: 100, height: 150, borderRadius: 10 }} />
                            <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                                <Text style={{ ...FONTS.h2, color: COLORS.white }}>{item.bookName}</Text>
                                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>{item.author}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            <FlatList
                ListHeaderComponent={() => (
                    <>
                        {renderHeader()}
                        {renderButtonSection()}
                        {renderMyBookSection()}
                        {renderCategoryHeader()}
                        {renderCategoryData()}
                    </>
                )}
                data={[]}
                renderItem={null}
                keyExtractor={() => "dummy"}
            />
        </SafeAreaView>
    );
};

export default Home;
