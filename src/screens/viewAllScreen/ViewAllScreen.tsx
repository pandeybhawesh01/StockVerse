// src/screens/ViewAllScreen.tsx

import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import StockCard from '../../components/stockCard/StockCard';
import { useExploreData } from '../../viewModels/useExploreData';
import { Stock, StockSectionKey } from '../exploreScreen/types';
import { StockStackParamList } from '../../navigation/types';
import { styles } from './styles';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import ArrowLeftIcon from 'react-native-heroicons/outline/ArrowLeftIcon';


type ViewAllRouteProp = RouteProp<StockStackParamList, 'ViewAll'>;

export default function ViewAllScreen() {
  const { data, isLoading, isError, refetch } = useExploreData();
  const route = useRoute<ViewAllRouteProp>();
  const { section } = route.params as { section: StockSectionKey };
  const navigation = useNavigation();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load data.</Text>
        <TouchableOpacity onPress={() => refetch()}>
          <Text style={styles.retryText}>Tap to Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  let items: Stock[];
  let title: string;

  switch (section) {
    case 'gainers':
      items = data.top_gainers;
      title = 'Top Gainers';
      break;
    case 'losers':
      items = data.top_losers;
      title = 'Top Losers';
      break;
    default:
      items = data.most_actively_traded;
      title = 'Most Actively Traded';
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={24} color="#000" />
          {/* <Text> === </Text> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => <StockCard stock={item} />}
        keyExtractor={(item) => item.ticker}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}



// // import React from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import { RouteProp } from '@react-navigation/native';
// import StockCard from '../../components/stockCard/StockCard';
// import { ExploreData, StockSectionKey} from '../exploreScreen/types'
// import { StockStackParamList } from '../../navigation/types';

// type ViewAllRouteProp = RouteProp<StockStackParamList, 'ViewAll'>;

// type Props = {
//   data: ExploreData;
// };
// const data = {
//     "metadata": "Top gainers, losers, and most actively traded US tickers",
//     "last_updated": "2025-06-27 16:15:59 US/Eastern",
//     "top_gainers": [
//         {
//             "ticker": "BGLWW",
//             "price": "0.31",
//             "change_amount": "0.23",
//             "change_percentage": "287.5%",
//             "volume": "1802352"
//         },
//         {
//             "ticker": "LCFY",
//             "price": "8.3",
//             "change_amount": "5.77",
//             "change_percentage": "228.0632%",
//             "volume": "95106753"
//         },
//         {
//             "ticker": "BGL",
//             "price": "62.5",
//             "change_amount": "40.53",
//             "change_percentage": "184.4788%",
//             "volume": "383156"
//         },
//         {
//             "ticker": "NXLIW",
//             "price": "0.07",
//             "change_amount": "0.0399",
//             "change_percentage": "132.5581%",
//             "volume": "500"
//         },
//         {
//             "ticker": "RCT",
//             "price": "3.24",
//             "change_amount": "1.82",
//             "change_percentage": "128.169%",
//             "volume": "77283705"
//         },
//         {
//             "ticker": "SERA",
//             "price": "4.09",
//             "change_amount": "2.11",
//             "change_percentage": "106.5657%",
//             "volume": "7421788"
//         },
//         {
//             "ticker": "JVSAU",
//             "price": "12.01",
//             "change_amount": "5.07",
//             "change_percentage": "73.0548%",
//             "volume": "12226"
//         },
//         {
//             "ticker": "AMIX",
//             "price": "2.01",
//             "change_amount": "0.76",
//             "change_percentage": "60.8%",
//             "volume": "42360232"
//         },
//         {
//             "ticker": "TGE+",
//             "price": "0.5568",
//             "change_amount": "0.1968",
//             "change_percentage": "54.6667%",
//             "volume": "61630"
//         },
//         {
//             "ticker": "RILYP",
//             "price": "2.33",
//             "change_amount": "0.75",
//             "change_percentage": "47.4684%",
//             "volume": "182962"
//         },
//         {
//             "ticker": "LIDRW",
//             "price": "0.0751",
//             "change_amount": "0.0233",
//             "change_percentage": "44.9807%",
//             "volume": "243381"
//         },
//         {
//             "ticker": "STSSW",
//             "price": "0.032",
//             "change_amount": "0.0098",
//             "change_percentage": "44.1441%",
//             "volume": "73882"
//         },
//         {
//             "ticker": "PSFE+",
//             "price": "0.0198",
//             "change_amount": "0.006",
//             "change_percentage": "43.4783%",
//             "volume": "196902"
//         },
//         {
//             "ticker": "POLEW",
//             "price": "0.26",
//             "change_amount": "0.0779",
//             "change_percentage": "42.7787%",
//             "volume": "863"
//         },
//         {
//             "ticker": "SOND",
//             "price": "2.27",
//             "change_amount": "0.67",
//             "change_percentage": "41.875%",
//             "volume": "4584388"
//         },
//         {
//             "ticker": "CREVW",
//             "price": "0.0249",
//             "change_amount": "0.0073",
//             "change_percentage": "41.4773%",
//             "volume": "1708"
//         },
//         {
//             "ticker": "ODYS",
//             "price": "7.01",
//             "change_amount": "2.04",
//             "change_percentage": "41.0463%",
//             "volume": "35795"
//         },
//         {
//             "ticker": "FVNNR",
//             "price": "0.17",
//             "change_amount": "0.0489",
//             "change_percentage": "40.3799%",
//             "volume": "6800"
//         },
//         {
//             "ticker": "SVRE",
//             "price": "3.19",
//             "change_amount": "0.9",
//             "change_percentage": "39.3013%",
//             "volume": "45968988"
//         },
//         {
//             "ticker": "EYEN",
//             "price": "10.88",
//             "change_amount": "2.99",
//             "change_percentage": "37.8961%",
//             "volume": "6003839"
//         }
//     ],
//     "top_losers": [
//         {
//             "ticker": "LIMNW",
//             "price": "0.175",
//             "change_amount": "-0.185",
//             "change_percentage": "-51.3889%",
//             "volume": "343902"
//         },
//         {
//             "ticker": "CLNNW",
//             "price": "0.022",
//             "change_amount": "-0.022",
//             "change_percentage": "-50.0%",
//             "volume": "64200"
//         },
//         {
//             "ticker": "DAIC",
//             "price": "8.67",
//             "change_amount": "-7.76",
//             "change_percentage": "-47.2307%",
//             "volume": "397775"
//         },
//         {
//             "ticker": "OTRK",
//             "price": "0.5534",
//             "change_amount": "-0.4201",
//             "change_percentage": "-43.1536%",
//             "volume": "3252028"
//         },
//         {
//             "ticker": "LIMN",
//             "price": "9.48",
//             "change_amount": "-7.12",
//             "change_percentage": "-42.8916%",
//             "volume": "651654"
//         },
//         {
//             "ticker": "GNLN",
//             "price": "3.08",
//             "change_amount": "-2.1713",
//             "change_percentage": "-41.3479%",
//             "volume": "1056023"
//         },
//         {
//             "ticker": "BARK+",
//             "price": "0.012",
//             "change_amount": "-0.0083",
//             "change_percentage": "-40.8867%",
//             "volume": "386001"
//         },
//         {
//             "ticker": "PMNT",
//             "price": "0.252",
//             "change_amount": "-0.172",
//             "change_percentage": "-40.566%",
//             "volume": "5070865"
//         },
//         {
//             "ticker": "UKOMW",
//             "price": "0.0056",
//             "change_amount": "-0.0038",
//             "change_percentage": "-40.4255%",
//             "volume": "30304"
//         },
//         {
//             "ticker": "WFF",
//             "price": "3.99",
//             "change_amount": "-2.65",
//             "change_percentage": "-39.9096%",
//             "volume": "26190412"
//         },
//         {
//             "ticker": "OUSTW",
//             "price": "0.032",
//             "change_amount": "-0.02",
//             "change_percentage": "-38.4615%",
//             "volume": "72115"
//         },
//         {
//             "ticker": "BULLZ",
//             "price": "0.82",
//             "change_amount": "-0.51",
//             "change_percentage": "-38.3459%",
//             "volume": "656289"
//         },
//         {
//             "ticker": "HSDT",
//             "price": "0.211",
//             "change_amount": "-0.1289",
//             "change_percentage": "-37.9229%",
//             "volume": "13477692"
//         },
//         {
//             "ticker": "ACHV",
//             "price": "2.23",
//             "change_amount": "-1.28",
//             "change_percentage": "-36.4672%",
//             "volume": "12130426"
//         },
//         {
//             "ticker": "OST",
//             "price": "0.3497",
//             "change_amount": "-0.2003",
//             "change_percentage": "-36.4182%",
//             "volume": "128382889"
//         },
//         {
//             "ticker": "KLTO",
//             "price": "0.7201",
//             "change_amount": "-0.4099",
//             "change_percentage": "-36.2743%",
//             "volume": "7959540"
//         },
//         {
//             "ticker": "AEMD",
//             "price": "1.25",
//             "change_amount": "-0.69",
//             "change_percentage": "-35.567%",
//             "volume": "969544"
//         },
//         {
//             "ticker": "CHEB+",
//             "price": "0.0526",
//             "change_amount": "-0.029",
//             "change_percentage": "-35.5392%",
//             "volume": "51007"
//         },
//         {
//             "ticker": "LEXXW",
//             "price": "0.11",
//             "change_amount": "-0.06",
//             "change_percentage": "-35.2941%",
//             "volume": "200"
//         },
//         {
//             "ticker": "ATIIW",
//             "price": "0.28",
//             "change_amount": "-0.152",
//             "change_percentage": "-35.1852%",
//             "volume": "19722"
//         }
//     ],
//     "most_actively_traded": [
//         {
//             "ticker": "GVH",
//             "price": "0.133",
//             "change_amount": "-0.0455",
//             "change_percentage": "-25.4902%",
//             "volume": "582328512"
//         },
//         {
//             "ticker": "BBAI",
//             "price": "5.855",
//             "change_amount": "0.055",
//             "change_percentage": "0.9483%",
//             "volume": "295386645"
//         },
//         {
//             "ticker": "NVDA",
//             "price": "157.75",
//             "change_amount": "2.73",
//             "change_percentage": "1.7611%",
//             "volume": "247508057"
//         },
//         {
//             "ticker": "HCTI",
//             "price": "0.0231",
//             "change_amount": "-0.0034",
//             "change_percentage": "-12.8302%",
//             "volume": "217516053"
//         },
//         {
//             "ticker": "LCID",
//             "price": "2.12",
//             "change_amount": "-0.08",
//             "change_percentage": "-3.6364%",
//             "volume": "199550061"
//         },
//         {
//             "ticker": "PLTR",
//             "price": "130.74",
//             "change_amount": "-13.51",
//             "change_percentage": "-9.3657%",
//             "volume": "192841085"
//         },
//         {
//             "ticker": "SOXS",
//             "price": "7.88",
//             "change_amount": "0.01",
//             "change_percentage": "0.1271%",
//             "volume": "181516180"
//         },
//         {
//             "ticker": "NU",
//             "price": "13.26",
//             "change_amount": "-0.13",
//             "change_percentage": "-0.9709%",
//             "volume": "179824785"
//         },
//         {
//             "ticker": "F",
//             "price": "10.805",
//             "change_amount": "0.175",
//             "change_percentage": "1.6463%",
//             "volume": "178065655"
//         },
//         {
//             "ticker": "OPEN",
//             "price": "0.5584",
//             "change_amount": "0.0204",
//             "change_percentage": "3.7918%",
//             "volume": "165811007"
//         },
//         {
//             "ticker": "TSLL",
//             "price": "12.27",
//             "change_amount": "-0.17",
//             "change_percentage": "-1.3666%",
//             "volume": "144406474"
//         },
//         {
//             "ticker": "OST",
//             "price": "0.3497",
//             "change_amount": "-0.2003",
//             "change_percentage": "-36.4182%",
//             "volume": "128382889"
//         },
//         {
//             "ticker": "AUR",
//             "price": "5.17",
//             "change_amount": "-0.23",
//             "change_percentage": "-4.2593%",
//             "volume": "123264790"
//         },
//         {
//             "ticker": "DNN",
//             "price": "1.785",
//             "change_amount": "-0.055",
//             "change_percentage": "-2.9891%",
//             "volume": "120908412"
//         },
//         {
//             "ticker": "BURU",
//             "price": "0.3365",
//             "change_amount": "-0.0035",
//             "change_percentage": "-1.0294%",
//             "volume": "120241840"
//         },
//         {
//             "ticker": "NKE",
//             "price": "72.07",
//             "change_amount": "9.53",
//             "change_percentage": "15.2382%",
//             "volume": "114060604"
//         },
//         {
//             "ticker": "SOXL",
//             "price": "25.09",
//             "change_amount": "-0.11",
//             "change_percentage": "-0.4365%",
//             "volume": "112054043"
//         },
//         {
//             "ticker": "QS",
//             "price": "6.615",
//             "change_amount": "-1.035",
//             "change_percentage": "-13.5294%",
//             "volume": "107010689"
//         },
//         {
//             "ticker": "AMZN",
//             "price": "223.3",
//             "change_amount": "6.18",
//             "change_percentage": "2.8464%",
//             "volume": "106491965"
//         },
//         {
//             "ticker": "GOOGL",
//             "price": "178.53",
//             "change_amount": "4.99",
//             "change_percentage": "2.8754%",
//             "volume": "98373129"
//         }
//     ]
// }

// export default function ViewAllScreen() {
//   const route = useRoute<ViewAllRouteProp>();
//   const { section } = route.params;

//   // select the correct list
//   const items = (
//     section === 'gainers' ? data.top_gainers :
//     section === 'losers' ? data.top_losers :
//     data.most_actively_traded
//   );

//   // human‑readable title
//   const title =
//     section === 'gainers' ? 'Top Gainers' :
//     section === 'losers' ? 'Top Losers' :
//     'Most Actively Traded';

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>{title}</Text>
//       <FlatList
//         data={items}
//         renderItem={({ item }) => <StockCard stock={item} />}
//         keyExtractor={item => item.ticker}
//         contentContainerStyle={styles.list}
//         columnWrapperStyle={styles.row}
//         numColumns={2}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#fff' },
//   header: { fontSize: 24, fontWeight: '700', marginBottom: 16, color: '#000' },
//   list: { paddingBottom: 16, justifyContent: 'space-around'},
//   row: {
//     justifyContent: 'space-around',
//     marginBottom: 12,
//   },
// });
