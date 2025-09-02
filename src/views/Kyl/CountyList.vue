<template>
  <div class="kyl">
    <header class="kyl__header">
      <h1 class="kyl__title">Know Your Leader</h1>

      <div class="kyl__search">
        <input
          v-model="q"
          @keyup.enter="runSearch"
          class="kyl__search-input"
          type="text"
          placeholder="Search leader, county, or constituency…"
        />
        <button class="kyl__btn" @click="runSearch">Search</button>
      </div>

      <p v-if="error" class="kyl__error">{{ error }}</p>
    </header>

   
    <section v-if="result" class="card">
      <h2 class="card__title">Search Result</h2>

     
      <div v-if="result.type==='leader'">
        <div class="kv"><span>Name</span><strong>{{ result.data.name }}</strong></div>
        <div class="kv"><span>Position</span><strong>{{ showField(result.data, 'position', 'position_id') }}</strong></div>
        <div class="kv"><span>Party</span><strong>{{ result.data.party || '—' }}</strong></div>
        <div class="kv"><span>County</span><strong>{{ showField(result.data, 'county', 'county_id') }}</strong></div>
        <div class="kv" v-if="result.data.constituency || result.data.constituency_id">
          <span>Constituency</span><strong>{{ showField(result.data, 'constituency', 'constituency_id') }}</strong>
        </div>
      </div>

      <div v-else-if="result.type==='county'">
        <div class="kv"><span>County</span><strong>{{ result.data.name }}</strong></div>
        <button class="kyl__btn" @click="openCounty(result.data.id)">View leaders</button>
      </div>

     <div v-else-if="result.type==='constituency'" class="constituency-card">
  <div class="kv">
    <span class="label">Constituency</span>
    <strong>{{ result.data.name }}</strong>
  </div>

  <div class="kv">
    <span class="label">County</span>
    <strong>{{ showField(result.data, 'county', 'county_id') }}</strong>
  </div>

  <div v-if="result.data.mp" class="mp-section">
    <h3 class="subhead">Member of Parliament</h3>
    <div class="mp-card">
      <div class="mp-name">{{ result.data.mp.name }}</div>
      <div class="mp-details">
        <span class="position">{{ showField(result.data.mp, 'position', 'position_id') }}</span>
        <span v-if="result.data.mp.party" class="party">
          ({{ result.data.mp.party }})
        </span>
      </div>
    </div>
  </div>

  <p v-else class="muted">No MP recorded for this constituency.</p>
</div>


    </section>

    <section class="card">
      <div class="card__head">
        <h2 class="card__title">All Counties</h2>
        <input
          v-model="filter"
          class="kyl__search-input kyl__search-input--mini"
          placeholder="Filter counties…"
          type="text"
        />
      </div>

      <ul class="grid">
        <li
          v-for="county in filteredCounties"
          :key="county.id"
          class="grid__item"
        >
          <div class="county">
            <div class="county__name">{{ county.name }}</div>
            <button class="kyl__btn kyl__btn--ghost" @click="openCounty(county.id)">
              View leaders
            </button>
          </div>
        </li>
      </ul>
    </section>

  <section v-if="selectedCounty" class="leaders-card">
  <div class="leaders-header">
    <h2 class="leaders-title">{{ selectedCounty.name }} — Leaders</h2>
  </div>

  <ul class="leaders-list">
    <li v-for="(leader, i) in normalizedLeaders" :key="i" class="leader-item">
      <template v-if="typeof leader === 'string'">
        <span class="info-text">{{ leader }}</span>
      </template>
      <template v-else>
        <div class="leader-info">
          <h3 class="leader-name">{{ leader.name }}</h3>
          <p class="leader-meta">
            {{ leader.position }}
            <span v-if="leader.party" class="party">({{ leader.party }})</span>
            <span v-if="leader.constituency" class="constituency">• {{ leader.constituency }}</span>
          </p>
        </div>
      </template>
    </li>
  </ul>
</section>

  </div>
</template>

<script>
import { getCounties, searchAny, getCountyLeaders } from "@/services/kyl";

export default {
  name: "KnowYourLeader",
  data() {
    return {
      q: "",
      filter: "",
      counties: [],
      result: null,
      error: "",
      selectedCounty: null,
      countyLeadersRaw: null,
    };
  },
  computed: {
    filteredCounties() {
      const f = this.filter.trim().toLowerCase();
      if (!f) return this.counties;
      return this.counties.filter(c => c.name.toLowerCase().includes(f));
    },
    normalizedLeaders() {
     
      if (!this.countyLeadersRaw) return [];
      const leaders = this.countyLeadersRaw.leaders || [];
      return leaders.map(l => {
        if (typeof l === "string") return l;
      
        return {
          name: l.name ?? "—",
          position: l.position ?? (l.position_name ?? "—"),
          party: l.party ?? null,
          constituency: l.constituency ?? null,
        };
      });
    },
  },
  async created() {
    try {
      const res = await getCounties();
      this.counties = res.data;
    } catch (e) {
      this.error = "Failed to load counties.";

      console.error(e);
    }
  },
  methods: {
    showField(obj, strKey, idKey) {
      if (!obj) return "—";
      if (obj[strKey]) return obj[strKey];
      if (obj[idKey]) return obj[idKey];
      return "—";
    },
    async runSearch() {
      this.error = "";
      this.result = null;
      if (!this.q.trim()) {
        this.error = "Type something to search.";
        return;
      }
      try {
        const res = await searchAny(this.q.trim());
        this.result = res.data;
        this.selectedCounty = null;
        this.countyLeadersRaw = null;
      } catch (e) {
        this.error = e?.response?.data?.message || "No results found.";
        this.result = null;
      }
    },
    async openCounty(id) {
      try {
        const res = await getCountyLeaders(id);
      
        this.selectedCounty = { id: res.data.id, name: res.data.name };
        this.countyLeadersRaw = res.data;
        this.result = null;
        this.error = "";
      } catch (e) {
        this.error = "Failed to load county leaders.";
        
        console.error(e);
      }
    },
  },
};
</script>

<style scoped>
.kyl {
  max-width: 920px;
  margin: 32px auto;
  padding: 0 16px;
  color: #1f2937;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
}


.kyl__header { margin-bottom: 16px; }
.kyl__title { font-size: 28px; font-weight: 800; margin: 0 0 12px; }

.kyl__search { display: flex; gap: 8px; align-items: center; }
.kyl__search-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: border-color .15s ease;
  background: #fff;
}
.kyl__search-input:focus { border-color: #2563eb; }

.kyl__search-input--mini {
  max-width: 240px;
  background: #fff;
}

.kyl__btn {
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: #4D0099;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: transform .05s ease, filter .2s ease, background .2s ease;
}
.kyl__btn:hover { filter: brightness(1.03); }
.kyl__btn:active { transform: translateY(1px); }

.kyl__btn--ghost {
  background: #eef2ff;
  color: #1e40af;
}
.kyl__btn--ghost:hover { background: #e0e7ff; }

.card {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 16px;
  margin-top: 16px;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
}
.card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.card__title { margin: 0 0 12px; font-size: 18px; font-weight: 800; }


.grid {
  --min: 220px;
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--min), 1fr));
  gap: 10px;
}
.grid__item { display: block; }
.leaders-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  margin-top: 1.5rem;
  transition: all 0.3s ease;
}

.leaders-card:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

.leaders-header {
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
}

.leaders-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #222;
}

.leaders-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.leader-item {
  padding: 0.8rem 0;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  align-items: flex-start;
  transition: background 0.2s ease;
}

.leader-item:last-child {
  border-bottom: none;
}

.leader-item:hover {
  background: #fafafa;
  border-radius: 8px;
  padding-left: 0.5rem;
}

.leader-info {
  flex: 1;
}

.leader-name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a237e;
}

.leader-meta {
  margin: 0.3rem 0 0;
  font-size: 0.9rem;
  color: #555;
}

.party {
  color: #00897b;
  font-weight: 500;
}

.constituency {
  color: #4D0099;
  margin-left: 0.3rem;
}

.info-text {
  font-style: italic;
  color: #777;
}

.county {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
}
.county__name { font-weight: 600; }

.list { margin: 8px 0 0; padding: 0 0 0 18px; }
.subhead { margin: 8px 0; font-size: 16px; font-weight: 700; }
.kv { display: flex; gap: 12px; padding: 4px 0; }
.kv > span { color: #6b7280; min-width: 120px; }
.muted { color: #6b7280; font-size: 14px; }

.kyl__error {
  margin-top: 8px;
  color: #b91c1c;
  font-weight: 600;
}
.mt { margin-top: 10px; }

.constituency-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  margin-bottom: 1rem;
}

.kv {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.kv .label {
  color: #555;
  font-weight: 500;
}

.subhead {
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 1px solid #eee;
  padding-bottom: 4px;
}

.mp-section {
  margin-top: 12px;
}

.mp-card {
  padding: 10px 12px;
  border-radius: 8px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
}

.mp-name {
  font-weight: 600;
  font-size: 1rem;
}

.mp-details {
  font-size: 0.9rem;
  color: #666;
}

.party {
  color: #4D0099; 
  font-weight: 500;
}

</style>
