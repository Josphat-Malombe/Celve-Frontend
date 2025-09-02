<template>
  <div>
    <h1>By-elections</h1>
    <section>
      <div class="elections">
        <div v-if="loading" class="loading">Loading Election Details...</div>
        <div v-else-if="error" class="error">{{ error }}</div>

        <div v-else class="election-list">
          <div
            v-for="election in elections"
            :key="election.id"
            class="election-card"
          >
            <h2> {{ election.location_name }}, {{ election.location_type }}</h2>
            <h4>{{ election.position }}</h4>
            <p>{{ formatDate(election.election_date) }}</p>

            <button @click="toggleCandidates(election.id)">
              {{ expandedElection === election.id ? 'Hide' : 'View' }} Candidates
            </button>

            <div v-if="expandedElection === election.id" class="candidates">
              <ul>
                <li v-for="cand in election.candidates" :key="cand.id">
                  {{ cand.name }} — <strong>{{ cand.party }}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getElectionDetails } from "@/services/kyl";

export default {
  name: "Elections",
  data() {
    return {
      loading: false,
      error: null,
      elections: [],
      expandedElection: null, 
    };
  },
  methods: {
    async fetchElectionDetails() {
      this.loading = true;
      this.error = null;
      try {
        const res = await getElectionDetails();
        this.elections = Array.isArray(res.data) ? res.data : res.data.result;
      } catch (err) {
        this.error = "Failed to load elections";
        console.error("Error fetching elections detail", err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateStr) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
    toggleCandidates(electionId) {
      this.expandedElection =
        this.expandedElection === electionId ? null : electionId;
    },
  },
  mounted() {
    this.fetchElectionDetails();
  },
};
</script>

<style>

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f5f7fa;
  color: #333;
  line-height: 1.6;
  margin: 0;
  padding: 0;
}


.elections {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: #1a3c5e;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
}


.election-list {
  display: column;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}


.election-card {
  background: #ffffff;
  border: 1px solid #e0e4e8;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.election-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.election-card h2 {
  font-size: 1.5rem;
  color: #1a3c5e;
  margin: 0 0 0.5rem;
  font-weight: 600;
}

.election-card h4 {
  font-size: 1.1rem;
  color: #4a6b8a;
  margin: 0 0 0.75rem;
  font-weight: 500;
}

.election-card p {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0 0 1rem;
}

.election-card button {
  background:#4D0099;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.election-card button:hover {
  background: #0e64c0;
  transform: translateY(-2px);
}

.election-card button:active {
  transform: translateY(0);
}

.candidates {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #4D0099;
  animation: slideDown 0.3s ease;
}

.candidates ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.candidates li {
  font-size: 0.95rem;
  color: #333;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e4e8;
}

.candidates li:last-child {
  border-bottom: none;
}

.candidates li strong {
  color: #4D0099;
}


.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #4a6b8a;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.error {
  text-align: center;
  font-size: 1.2rem;
  color: #dc2626;
  padding: 2rem;
  background: #fef2f2;
  border-radius: 12px;
  border: 1px solid #fecaca;
}


@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .elections {
    padding: 1rem;
  }

  .election-list {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 2rem;
  }

  .election-card {
    padding: 1.25rem;
  }
}
</style>