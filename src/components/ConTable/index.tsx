import React, { useState, useMemo, useRef, useEffect } from 'react';
import cs2_data from '@site/con_dump/condump_cs2.json'
import hla_data from '@site/con_dump/condump_hla.json'
import steamvr_data from '@site/con_dump/condump_steamvr.json'
import dota2_data from '@site/con_dump/condump_dota2.json'
import styles from './styles.module.css';
import clsx from "clsx";

interface ConTableProps {
  game?: string;
}

interface ConEntry {
  Name: string
  DefaultValue: string
  Description: string;
  flags: string[];
}
const ConTable: React.FC<ConTableProps> = ({ game }) => {
  const getConDataForGame = (gameKey?: string) => {
    switch (gameKey) {
      case 'cs2':
        return cs2_data;
      case 'hla':
        return hla_data;
      case 'dota2':
        return dota2_data;
      case 'steamvr':
        return steamvr_data;
      case 'default':
        return null;
    }
  };

  const getFormattedFlags = (flags: string[]) : string =>{
    let returnString = "";
    
    for (let index = 0; index < flags.length; index++) {
      
      returnString += `${flags[index].trim()}`
      
      if(index < flags.length - 1)
      {
        returnString += " | "
      }
    }

    return returnString;
  }
  
  const conData: ConEntry[] = useMemo(() => getConDataForGame(game), [game]);;
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredConData = useMemo(() => {
    let filtered = conData;
    
    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(conData => 
        conData.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [conData, searchTerm]);

  return (
    <div className={styles.table}>
      <div className={styles.searchBox}>
        <input 
          className={clsx("navbar__search-input", styles.input)} 
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredConData.length === 0 ? (
        <div className={styles.noResults}>
          No console variables/commands found matching your filters
        </div>
      ) : (
        <>
          <div className={styles.resultsCount}>
            Showing {filteredConData.length} of {conData.length} console variables/commands
          </div>
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Default Value</th>
                <th>Flags</th>
              </tr>
            </thead>
            <tbody>
              {filteredConData.map((conData, index) => {
                return (
                  <tr key={index} className={styles.clickableRow}>
                    
                    <td>
                       <code className={styles.code} dangerouslySetInnerHTML={{ __html: conData.Name }}/>
                    </td>

                    <td dangerouslySetInnerHTML={{ __html: conData.Description }} />

                    <td>
                       <code className={styles.code} dangerouslySetInnerHTML={{ __html: conData.DefaultValue }}/>
                    </td>
                    
                    {
                      conData.flags.length > 0 ? <td> <code className={styles.code} dangerouslySetInnerHTML={{ __html: getFormattedFlags(conData.flags)}}/> </td>
                                               :
                                                 <td dangerouslySetInnerHTML={{ __html: getFormattedFlags(conData.flags)}}/>
                    }
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ConTable;