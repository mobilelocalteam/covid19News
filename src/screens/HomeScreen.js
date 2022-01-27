import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../components/Header';
import {sizes} from '../helper/FontSizes';
import {deobfuscate} from '../helper/Helper';
import CardView from '../components/CardView';
import Loading from '../components/Loading';

const HomeScreen = () => {
  const [sections, setSections] = useState([]);
  const [navHeaderTitle, setNavHeaderTitle] = useState('');
  const [headerTitle, setHeaderTitle] = useState('');
  const [cases, setCases] = useState([]);
  const [footerLabel, setFooterLable] = useState('');
  const [selectedSection, setSelectedSection] = useState({});
  const [news, setNews] = useState([]);
  const [eductions, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);

  const secretKey = 1491574401791631;
  const cjs = require('crypto-js');
  const covidNewsURL =
    'https://onepayuat.agdbank.com/API/Wallet/Wallet_GetNewsAlertDashboardWithSection';

  const covidNewsDetailURL =
    'https://onepayuat.agdbank.com/API/Wallet/Wallet_GetNewsContentBySection';

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (sections.length != 0) {
      fetchNews();
      fetchEducation();
    }
  }, [sections]);

  const fetchData = () => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        UserID: 'GHTShvJNJmw=',
        SessionID: 'Fzj/Qc/MGoc=',
        NewsAlertID: 'YvG07IPjjpM=',
      }),
    };

    fetch(covidNewsURL, options)
      .then(res => res.json())
      .then(res => {
        const decryptedData = deobfuscate(
          res.NewsAlertEncModel,
          secretKey,
          cjs,
        );
        const data = JSON.parse(decryptedData);
        const title = `${data.Dashboard[0].Header} (As of ${data.Dashboard[0].LastUpdate})`;

        console.log('data', data);

        setNavHeaderTitle(data.Title);
        setCases(data.Dashboard[0].Data);
        setFooterLable(data.Dashboard[0].Footer);
        setHeaderTitle(title);
        setSections(data.News);
        setSelectedSection(data.News[0]);
        setLoading(false);
      })
      .catch(err => {
        console.log('err', err);
        setLoading(false);
      });
  };

  const onBackPress = () => {};

  const onPressSection = section => {
    setSelectedSection(section);
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
      </View>
    );
  };

  const renderCases = () => {
    return (
      <View style={styles.caseContainer}>
        <View style={styles.allCasesWrapper}>
          {cases.map((item, index) => (
            <View style={styles.caseWrapper} key={index}>
              <Text style={styles.caseTitle}>{item.Title}</Text>
              <Text style={styles.caseValue}>{item.Value}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.disclaimerLabel}>{footerLabel}</Text>
      </View>
    );
  };

  const renderSections = () => {
    return (
      <View style={styles.sectionContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onPressSection(section)}
            style={[
              styles.sectionWrapper,
              {
                backgroundColor:
                  selectedSection.NewsSectionID == section.NewsSectionID
                    ? 'blue'
                    : 'transparent',
              },
            ]}>
            <Text
              style={[
                styles.sectionLabel,
                {
                  color:
                    selectedSection.NewsSectionID == section.NewsSectionID
                      ? 'white'
                      : 'grey',
                },
              ]}>
              {section.Name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const fetchNews = () => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        SessionID: 'Fzj/Qc/MGoc=',
        UserID: 'GHTShvJNJmw=',
        NewsAlertID: 'YvG07IPjjpM=',
        SectionID: 'YvG07IPjjpM=',
        Limit: 'q8z6gJiOhEk=',
        Page: 'xEOk88+xrpE=',
      }),
    };

    fetch(covidNewsDetailURL, options)
      .then(res => res.json())
      .then(res => {
        const decryptedData = deobfuscate(
          res.NewsAlertEncModel,
          secretKey,
          cjs,
        );

        const data = JSON.parse(decryptedData);

        setNews(news.concat(data));
      })
      .catch(err => console.log('err', err));
  };

  const fetchEducation = () => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        SessionID: 'Fzj/Qc/MGoc=',
        UserID: 'GHTShvJNJmw=',
        NewsAlertID: 'YvG07IPjjpM=',
        SectionID: 'yBwuKLl841Y=',
        Limit: 'q8z6gJiOhEk=',
        Page: 'xEOk88+xrpE=',
      }),
    };

    fetch(covidNewsDetailURL, options)
      .then(res => res.json())
      .then(res => {
        const decryptedData = deobfuscate(
          res.NewsAlertEncModel,
          secretKey,
          cjs,
        );

        const data = JSON.parse(decryptedData);

        setEducations(eductions.concat(data));
      })
      .catch(err => console.log('err', err));
  };

  const renderItemSeparator = () => (
    <View
      style={{
        height: 1,
        backgroundColor: 'grey',
        width: '90%',
        alignSelf: 'center',
      }}
    />
  );

  const renderNews = () => {
    return (
      <FlatList
        data={news}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={renderItemSeparator}
        renderItem={({item}) => {
          return <CardView item={item} />;
        }}
      />
    );
  };

  const renderEducation = () => {
    return (
      <FlatList
        data={eductions}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={renderItemSeparator}
        renderItem={({item}) => {
          return <CardView item={item} />;
        }}
      />
    );
  };

  if (loading) return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={navHeaderTitle} onBackPress={onBackPress} />
      {renderHeader()}
      {renderCases()}
      {renderSections()}
      {selectedSection?.NewsSectionID == 2 ? renderNews() : renderEducation()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    marginLeft: 20,
  },
  caseContainer: {
    backgroundColor: '#fff',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  caseTitle: {
    fontSize: sizes.small,
    color: 'grey',
    marginBottom: 10,
  },
  caseValue: {
    fontSize: sizes.medium,
    fontWeight: 'bold',
  },
  caseWrapper: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  disclaimerLabel: {
    marginHorizontal: 20,
    color: 'grey',
    fontSize: sizes.small,
    marginBottom: 15,
  },
  allCasesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  sectionWrapper: {
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
  },
  sectionLabel: {
    color: 'white',
    paddingHorizontal: 15,
  },
});

export default HomeScreen;
