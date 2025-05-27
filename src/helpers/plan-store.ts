export interface Plan {
  id: string;
  name: string;
  content: string;
  public_slug: string;
  bookmark: boolean;
  created_at: string;
  user_id: string;
}

export class PlanStore {

  async fetchSavedPlans(token: string): Promise<Plan[]> {
    try {
      const response = await fetch(`/api/plans`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data.plans;
    } catch (error) {
      console.error('Error fetching saved plans:', error);
      throw error;
    }
  }

  async fetchSavedPlanHistory(plan_id: string, token: string): Promise<Plan[]>{
    try{
      const response = await fetch(`/plans/history/${plan_id}"`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data.plans;
    } catch (error) {
      console.error('Error fetching plan history:', error);
      throw error;
    }
  }

  async savePlan(planName: string, modules: string, token: string): Promise<void> {
    const payload = JSON.stringify({ name: planName, content: modules });
    try {
      const response = await fetch(`/api/plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: payload,
      });
      if (!response.ok) {
        throw new Error('Failed to store plan');
      }
    } catch (error) {
      console.error('Error storing plan:', error);
      throw error;
    }
  }

  async deletePlan(planId: string, token: string): Promise<void> {
    try {
      const response = await fetch(`/api/plans/${planId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete plan');
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
      throw error;
    }
  }
}
