import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../constants';

const SearchBooksScreen = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [allBooks, setAllBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch('http://192.168.153.19:7181/api/Books');
                const data = await res.json();
                setAllBooks(data);
                setFilteredBooks(data);
            } catch (err) {
                console.error('Lỗi lấy danh sách sách:', err);
            }
        };
        fetchBooks();
    }, []);

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = allBooks.filter(book =>
            book.bookName.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredBooks(filtered);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{ flexDirection: 'row', padding: SIZES.padding }}
            onPress={() => navigation.navigate('BookDetail', { book: item })}
        >
            <Image
                source={{ uri: `http://192.168.153.19:7181${item.bookCover}` }}
                style={{ width: 80, height: 120, borderRadius: 10 }}
                resizeMode="cover"
            />
            <View style={{ marginLeft: SIZES.radius, flex: 1 }}>
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>{item.bookName}</Text>
                <Text style={{ ...FONTS.body4, color: COLORS.lightGray }}>{item.author}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            <View style={{ padding: SIZES.padding }}>
                <TextInput
                    placeholder="Search books..."
                    placeholderTextColor={COLORS.lightGray}
                    style={{
                        height: 50,
                        borderRadius: 10,
                        paddingHorizontal: SIZES.radius,
                        backgroundColor: COLORS.gray,
                        color: COLORS.white,
                        marginBottom: SIZES.radius
                    }}
                    value={searchText}
                    onChangeText={handleSearch}
                />
            </View>
            <FlatList
                data={filteredBooks}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default SearchBooksScreen;
